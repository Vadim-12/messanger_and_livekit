import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './RoomPage.module.scss';
import { Box, Button, Typography } from '@mui/material';
import socket from 'socket';
import { useNavigate } from 'react-router-dom';
import { IMessage } from 'types/IMessage';
import HideChatIcon from 'ui/icons/chat/HideChatIcon';
import Message from 'components/Message';
import TextInput from 'components/TextInput';
import Cat2Icon from 'ui/icons/cats/Cat2Icon';
import Cat3Icon from 'ui/icons/cats/Cat3Icon';
import Cat4Icon from 'ui/icons/cats/Cat4Icon';
import CatIcon from 'ui/icons/cats/CatIcon';
import { LOGIN_ROUTE } from 'config/const/routes/website/login';
import PhoneIcon from 'ui/icons/media/PhoneIcon';
import MicrophoneIcon from 'ui/icons/media/MicrophoneIcon';
import CameraIcon from 'ui/icons/media/CameraIcon';
import ToggleChatIcon from 'ui/icons/chat/ToggleChatIcon';
import { colors } from 'theme/colors';
import EmptyIcon from 'ui/icons/cats/EmptyIcon';
import { API_LIVEKIT_TOKEN_ROUTE } from 'config/const/routes/api/livekit/token';
import { ROOM_NAME } from 'config/const/room';
import { IParticipant } from 'types/IParticipant';
import axios from 'axios';
import { AudioRenderer, VideoRenderer } from '@livekit/react-components';
import { vars } from 'config/vars';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  ParticipantEvent,
  RemoteTrack,
  Room,
  RoomEvent,
  TrackPublication,
  VideoPresets,
  createLocalAudioTrack,
  createLocalVideoTrack,
} from 'livekit-client';
import ParticipantView from 'components/ParticipantView';

interface Props {
  name: string;
};

const RoomPage: React.FC<Props> = ({ name }) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  const navigate = useNavigate();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isChatActive, setIsChatActive] = useState<boolean>(true);
  const [isHoverOnHideTextChatBtn, setIsHoverOnHideTextChatBtn] =
    useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<number>(0);
  const [configureWebRTC, setConfigureWebRTC] = useState<boolean>(false);

  const chatRef = createRef<HTMLElement>();

  const [token, setToken] = useState<string>('');
  const [localVideoTrack, setLocalVideoTrack] =
    useState<LocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<LocalAudioTrack | null>(null);

  const getToken = useCallback(async (identity: string) => {
    try {
      const response = await axios.get(
        `${API_LIVEKIT_TOKEN_ROUTE}?name=${name}&roomName=${ROOM_NAME}&identity=${identity}`
      );
      const token = response.data.AccessToken;
      return token;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [name]);

  // сделать AudioRender VideoRender и через потоки
  // import {AudioRenderer, VideoRenderer} from "@livekit/react-components";

  const room = new Room();

  useEffect(() => {
    if (!configureWebRTC && room && token) {
      webRTCconnect();
      setConfigureWebRTC(true);
    }
  }, [room, token]);

  const webRTCconnect = async () => {
    if (room) {
      room.connect(vars.LK_API_URL, token);
      room.localParticipant.enableCameraAndMicrophone();

      room.on(RoomEvent.ParticipantConnected, (np) => {
        console.log('connected participant', np, participants, room);
        
        const videoTracks: RemoteTrack[] = [];
        const audioTracks: RemoteTrack[] = [];

        const newParticipant: IParticipant = {
          socket,
          audioTracks,
          videoTracks,
          identity: np.identity,
        };

        setParticipants((prev) => [...prev, newParticipant]);
      });
      room.on(RoomEvent.ParticipantDisconnected, (dp) => {
        console.log('disconnected participant', dp);
        setParticipants((prev) => prev.filter((p) => p.identity !== dp.identity));
      });
      room.on(ParticipantEvent.TrackPublished, (rtp, participant) => {
        console.log('track published', rtp, participant);

        setParticipants(prev => {
          const p = prev.find(p => p.identity === participant.identity);

          if (!p) {
            throw new Error('Такого пользователя не существует');
          }
          if (rtp.kind === 'video') {
            if (rtp.track) {
              p.videoTracks.push(rtp.track);
              console.log('NEW VIDEO TRACK', rtp.track)
            }
          } else if (rtp.kind === 'audio') {
            if (rtp.track) {
              p.audioTracks.push(rtp.track);
              console.log('NEW AUDIO TRACK', rtp.track)
            }
          }

          return prev;
        });
      });

      const videoTrack = await createLocalVideoTrack({
        facingMode: 'user',
        // preset resolutions
        resolution: VideoPresets.h720,
      });
      const audioTrack = await createLocalAudioTrack({
        echoCancellation: true,
        noiseSuppression: true,
      });

      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);

      const videoPublication = await room.localParticipant.publishTrack(videoTrack);
      const audioPublication = await room.localParticipant.publishTrack(audioTrack);
    }
  }

  async function webRTCdisconnect() {
    if (room) {
      room.removeAllListeners();
      room.off(RoomEvent.Connected);
      room.off(RoomEvent.Disconnected);
      room.disconnect();
    }
  }

  const socketClear = useCallback(() => {
    socket.removeAllListeners();
    socket.disconnect();
  }, [socket]);

  const handleExit = useCallback(() => {
    if (room) {
      room.disconnect();
    }
    socketClear();
    navigate(LOGIN_ROUTE);
  }, []);

  const scrollToEndChat = useCallback(() => {
    if (chatRef.current) {
      const height = chatRef.current.scrollHeight;
      chatRef.current.scrollBy(0, height);
    }
  }, [chatRef]);

  useEffect(() => {
    if (!name) {
      handleExit();
      return;
    }

    socket.on('connect', async () => {
      socket.on('newMessage', (newMessage: IMessage) => {
        setMessages((prev) => [...prev, newMessage]);
        scrollToEndChat();
      });

      socket.on('prevMessages', (prevMessages: IMessage[]) => {
        setMessages(prevMessages);
      });

      const tokenFromServer = await getToken(socket.id);
      setToken(tokenFromServer);
    });

    socket.connect();

    return () => {
      webRTCdisconnect();
      socketClear();
    };
  }, []);

  const validateInput = useCallback(
    () => inputMessage.length > 0,
    [inputMessage]
  );

  const sendMessage = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (validateInput()) {
      const nowMoment = new Date(Date.now());
      const newMessage: IMessage = {
        id: Date.now(),
        socketID: socket.id,
        name,
        text: inputMessage,
        time: {
          hours: nowMoment.getHours(),
          minutes: nowMoment.getMinutes(),
        },
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage('');
      socket.emit('newMessage', newMessage);
      scrollToEndChat();
      setSentMessages((prev) => prev + 1);
    }
  };

  useEffect(() => {
    scrollToEndChat();
  }, [sentMessages]);

  const isMessageFirstInSequence = useCallback(
    (index: number) =>
      index ? messages[index - 1].socketID !== messages[index].socketID : true,
    [messages]
  );

  const isMessageLastInSequence = useCallback(
    (index: number) =>
      index < messages.length - 1
        ? messages[index + 1].socketID !== messages[index].socketID
        : true,
    [messages]
  );

  const videoChatWrapperStyles = useMemo(
    () => ({
      width: `${isChatActive ? 76 : 100}%`,
    }),
    [isChatActive]
  );

  const toggleChatBtnStyles = useMemo(
    () => ({
      background: isChatActive ? colors.primary.blue : colors.primary.white,
      borderRadius: '50%',
      aspectRatio: 1,
      width: 12,
      position: 'absolute',
      bottom: isChatActive ? 32 : 44,
      right: isChatActive ? 46 : 29,

      '&:hover': {
        background: isChatActive
          ? colors.primary.blueMore
          : colors.overlay.white.white75,
      },
    }),
    [isChatActive]
  );

  const fillToggleChatIcon = useMemo(
    () => (isChatActive ? colors.primary.white : colors.primary.black),
    [isChatActive]
  );

  const fillHideTextChatIcon = useMemo(
    () =>
      isHoverOnHideTextChatBtn ? colors.primary.blue : colors.primary.black,
    [isHoverOnHideTextChatBtn]
  );

  const messagesBlockStyles = useMemo(
    () => ({
      display: messages.length ? 'block' : 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [messages.length]
  );

  const messagesBlockContent = useMemo(
    () =>
      messages.length ? (
        messages.map((msg, index) => (
          <Message
            isFirstMessageInChat={!index}
            key={msg.id}
            msg={msg}
            socket={socket}
            isFirstMessageInSequence={isMessageFirstInSequence(index)}
            isLastMessageInSequence={isMessageLastInSequence(index)}
          />
        ))
      ) : (
        <Box>
          <EmptyIcon width="100%" />
          <Typography className={styles.emptyMessagesLabel}>
            No messages yet
          </Typography>
        </Box>
      ),
    [messages, socket]
  );

  const handleHideTextChatBtn = useCallback(() => {
    setIsChatActive(false);
    setIsHoverOnHideTextChatBtn(false);
  }, []);

  console.log('participants before render', participants)

  return (
    <Box className={styles.wrapper}>
      <Box sx={videoChatWrapperStyles} className={styles.videoChatWrapper}>
        <Box className={styles.container}>
          <Box className={styles.screensWrapper}>
            {localAudioTrack ? (
              <AudioRenderer track={localAudioTrack} isLocal={true} />
            ) : (
              'no audio'
            )}
            <Box className={styles.screenOne}>
              {localVideoTrack ? (
                <VideoRenderer
                  className={styles.videoContent}
                  track={localVideoTrack}
                  isLocal={true}
                />
              ) : (
                <Cat4Icon className={styles.catIcon} />
              )}
            </Box>
            {
              /*
              <>
                <Box className={styles.screenOne}>
                  {participants.length < 2 ? (
                    <Cat3Icon className={styles.catIcon} />
                  ) : (
                    'Пользователь 2 подключен'
                  )}
                </Box>
                <Box className={styles.screenOne}>
                  {participants.length < 3 ? (
                    <CatIcon className={styles.catIcon} />
                  ) : (
                    'Пользователь 3 подключен'
                  )}
                </Box>
                <Box className={styles.screenOne}>
                  {participants.length < 4 ? (
                    <Cat2Icon className={styles.catIcon} />
                  ) : (
                    'Пользователь 4 подключен'
                  )}
                </Box>
              </>
              */
             participants.map(p => (
              <Box key={p.identity} className={styles.screenOne}>
                {(p.audioTracks && p.audioTracks[0]) ? <AudioRenderer track={p.audioTracks[0]} isLocal={false}/> : 'no audio'}
                {(p.videoTracks && p.videoTracks[0]) ? <VideoRenderer track={p.videoTracks[0]} isLocal={false}/> : <Cat2Icon className={styles.catIcon}/>}
              </Box>
             ))
            }
          </Box>
          <Box className={styles.btns}>
            <Button>
              <MicrophoneIcon />
            </Button>
            <Button>
              <CameraIcon />
            </Button>
            <Button className={styles.exitBtn} onClick={handleExit}>
              <PhoneIcon />
            </Button>
          </Box>
          <Button
            sx={toggleChatBtnStyles}
            onClick={() => setIsChatActive((prev) => !prev)}
          >
            <ToggleChatIcon fill={fillToggleChatIcon} />
          </Button>
        </Box>
      </Box>
      {isChatActive && (
        <Box
          component="form"
          autoComplete="off"
          autoCapitalize="off"
          className={styles.textChatWrapper}
        >
          <Box className={styles.header}>
            <Button
              className={styles.hideTextChatBtn}
              onClick={handleHideTextChatBtn}
              onMouseEnter={() => setIsHoverOnHideTextChatBtn(true)}
              onMouseLeave={() => setIsHoverOnHideTextChatBtn(false)}
            >
              <HideChatIcon fill={fillHideTextChatIcon} />
            </Button>
            <Typography variant="h2">Chat</Typography>
          </Box>
          <Box
            sx={messagesBlockStyles}
            className={styles.messages}
            ref={chatRef}
          >
            {messagesBlockContent}
            <Box className={styles.fadingBackground}></Box>
          </Box>
          <TextInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            sendMessage={sendMessage}
          />
        </Box>
      )}
    </Box>
  );
};

export default RoomPage;
