import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './RoomPage.module.scss';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
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
  LocalTrackPublication,
  LocalVideoTrack,
  RemoteTrack,
  Room,
  RoomEvent,
  VideoPresets,
  createLocalAudioTrack,
  createLocalVideoTrack,
} from 'livekit-client';
import MuteMicrophoneIcon from 'ui/icons/media/MuteMicrophoneIcon';
import MuteCameraIcon from 'ui/icons/media/MuteCameraIcon';

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const catsArray = [
  <Cat3Icon className={styles.catIcon}/>,
  <Cat4Icon className={styles.catIcon}/>,
  <CatIcon className={styles.catIcon}/>,
]

const RoomPage: React.FC<Props> = ({ name, setName }) => {
  const isLessThan1100px = useMediaQuery('screen and (max-width: 1100px)');
  const isLessThan900px = useMediaQuery('screen and (max-width: 900px)');
  
  const navigate = useNavigate();

  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [, setRefreshThePage] = useState<number>(0);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const [isChatActive, setIsChatActive] = useState<boolean>(!isLessThan900px);
  const [isHoverOnHideTextChatBtn, setIsHoverOnHideTextChatBtn] = useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<number>(0);

  const [configureWebRTC, setConfigureWebRTC] = useState<boolean>(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState<boolean>(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState<boolean>(true);

  const chatRef = createRef<HTMLElement>();

  const [token, setToken] = useState<string>('');
  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack>();
  const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack>();
  const [, setCameraLtp] = useState<LocalTrackPublication>();
  const [, setMicrophoneLtp] = useState<LocalTrackPublication>();

  const room = useMemo(() => new Room(), [name]);

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

  const webRTCconnect = useCallback(
    async () => {
      if (room) {
        await room.connect(vars.LK_API_URL, token);

        const oldParticipants: IParticipant[] = []

        for (let p of room.participants.values()) {
          let participant: IParticipant = {
            identity: p.identity,
            name: p.name || '',
            videoTracks: [],
            audioTracks: []
          };

          for (let vrt of p.videoTracks.values()) {
            if (vrt.track) {
              participant.videoTracks.push(vrt.track);
            }
          }

          for (let art of p.audioTracks.values()) {
            if (art.track) {
              participant.audioTracks.push(art.track);
            }
          }

          oldParticipants.push(participant)
        }
        setParticipants(oldParticipants);
        setRefreshThePage(prev => prev + 1);

        room.on(RoomEvent.ParticipantConnected, (np) => {
          const videoTracks: RemoteTrack[] = [];
          const audioTracks: RemoteTrack[] = [];

          const newParticipant: IParticipant = {
            identity: np.identity,
            name: np.name || '',
            audioTracks,
            videoTracks,
          };

          setParticipants((prev) => [...prev, newParticipant]);
          setRefreshThePage(prev => prev + 1);
        });
        room.on(RoomEvent.ParticipantDisconnected, (dp) => {
          setParticipants((prev) => prev.filter((p) => p.identity !== dp.identity));
          setRefreshThePage(prev => prev + 1);
        });
        room.on(RoomEvent.TrackSubscribed, (track, rtp, participant) => {
          setParticipants(prev => {
            const p = prev.find(p => p.identity === participant.identity);

            if (!p) {
              const track = rtp.track;
              if (!track) {
                return prev;
              }

              const pp: IParticipant = {
                identity: participant.identity,
                name: '',
                audioTracks: [],
                videoTracks: [],
              };

              if (track.kind === 'audio') {
                pp.audioTracks.push(track);
              }

              prev.push(pp);
              return prev;
            }
            if (track.kind === 'video') {
              p.videoTracks.push(track);
            } else if (rtp.kind === 'audio') {
              p.audioTracks.push(track);
            }

            return prev;
          });
          setRefreshThePage(prev => prev + 1);
        });
        room.on(RoomEvent.TrackMuted, (tp, participant) => {
          const track = tp.track;

          if (track) {
            setParticipants(prev => {
              const p = prev.find(p => p.identity === participant.identity);

              if (p) {
                if (track.kind === 'video') {
                  p.videoTracks = p.videoTracks.map(vt => {
                    if (vt.sid === tp.trackSid) {
                      vt.setMuted(true);
                    }
                    return vt;
                  });
                } else if (track.kind === 'audio') {
                  p.audioTracks = p.audioTracks.map(at => {
                    if (at.sid === tp.trackSid) {
                      at.setMuted(true);
                    }
                    return at;
                  });
                }
              }

              return prev;
            });
            setRefreshThePage(prev => prev + 1);
          }
        });
        room.on(RoomEvent.TrackUnmuted, (tp, participant) => {
          const track = tp.track;

          if (track) {
            setParticipants(prev => {
              const p = prev.find(p => p.identity === participant.identity);

              if (p) {
                if (track.kind === 'video') {
                  p.videoTracks = p.videoTracks.map(vt => {
                    if (vt.sid === tp.trackSid) {
                      vt.setMuted(false);
                    }
                    return vt;
                  });
                } else if (track.kind === 'audio') {
                  p.audioTracks = p.audioTracks.map(at => {
                    if (at.sid === tp.trackSid) {
                      at.setMuted(false);
                    }
                    return at;
                  });
                }
              }

              return prev;
            });
            setRefreshThePage(prev => prev + 1);
          }
        })

        const videoTrack = await createLocalVideoTrack({
          facingMode: 'user',
          resolution: VideoPresets.h720,
        });
        const audioTrack = await createLocalAudioTrack({
          echoCancellation: true,
          noiseSuppression: true,
        });

        const cameraLtp = await room.localParticipant.setCameraEnabled(true);
        const microphoneLtp = await room.localParticipant.setMicrophoneEnabled(true);

        if (cameraLtp) {
          setCameraLtp(cameraLtp);
        }
        if (microphoneLtp) {
          setMicrophoneLtp(microphoneLtp);
        }

        setLocalVideoTrack(videoTrack);
        setLocalAudioTrack(audioTrack);
      }
    },
    [room, token, participants, setParticipants, setRefreshThePage, setCameraLtp, setMicrophoneLtp, setLocalAudioTrack, setLocalVideoTrack]
  );

  useEffect(() => {
    if (!configureWebRTC && room && token) {
      webRTCconnect();
      setConfigureWebRTC(true);
    }
  }, [room, token]);

  const webRTCdisconnect = useCallback(async () => {
    if (room) {
      await room.disconnect();
    }
  }, [room]);

  const socketClear = useCallback(() => {
    socket.removeAllListeners();
    socket.disconnect();
  }, [socket]);

  const handleExit = useCallback(
    async () => {
      await webRTCdisconnect();
      socketClear();
      setName('');
      navigate(LOGIN_ROUTE);
    },
    [socketClear, webRTCdisconnect, setName]
  );

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
      handleExit();
    };
  }, []);

  const validateInput = useCallback(
    () => inputMessage.length > 0,
    [inputMessage]
  );

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLElement>) => {
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
    },
    [validateInput, socket, name, inputMessage, setMessages, setInputMessage, scrollToEndChat, setSentMessages]
  );

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
      width: `${isChatActive ? (isLessThan1100px ? (isLessThan900px ? 0 : 70) : 76) : 100}%`,
    }),
    [isChatActive, isLessThan1100px]
  );

  const toggleChatBtnStyles = useMemo(
    () => ({
      background: isChatActive ? colors.primary.blue : colors.primary.white,
      borderRadius: '50%',
      aspectRatio: 1,
      width: 12,
      position: 'fixed',
      bottom: isLessThan900px ? 'none' : (isChatActive ? 32 : 44),
      top: isLessThan900px ? 30 : 'none',
      right: `calc(${isChatActive ? (isLessThan1100px ? '30%' : '24%') : '0px'} + ${isChatActive ? 46 : 29}px)`,

      '&:hover': {
        background: isChatActive
          ? colors.primary.blueMore
          : colors.overlay.white.white75,
      },
    }),
    [isChatActive, isLessThan1100px, isLessThan900px]
  );

  const textChatWrapperStyles = useMemo(
    () => ({
      width: isLessThan1100px ? (isLessThan900px ? '100%' : '30%') : '24%'
    }),
    [isLessThan900px]
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

  const toolBtnsStyles = useMemo(
    () => ({
      left: isChatActive ? `calc(${isLessThan1100px ? 70 : 76}%/2)` : '50%',
      transform: 'translateX(-50%)'
    }),
    [isChatActive, isLessThan1100px]
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

  const handleChangeMicrophone = async () => {
    setIsMicrophoneEnabled(prev => !prev);
    if (localAudioTrack) {
      if (isMicrophoneEnabled) {
        setMicrophoneLtp(prev => {
          prev?.audioTrack?.mute().then(lat => {
            if (lat) {
              setLocalAudioTrack(lat);
            }
          });
          return prev;
        });
      } else {
        setMicrophoneLtp(prev => {
          prev?.audioTrack?.unmute().then(lat => {
            if (lat) {
              setLocalAudioTrack(lat);
            }
          });
          return prev;
        });
      }
    }
  }

  const handleChangeCamera = async () => {
    setIsCameraEnabled(prev => !prev);
    if (localVideoTrack) {
      if (isCameraEnabled) {
        setCameraLtp(prev => {
          prev?.videoTrack?.mute().then(lvt => {
            if (lvt) {
              setLocalVideoTrack(lvt);
            }
          });
          return prev;
        });
      } else {
        setCameraLtp(prev => {
          prev?.videoTrack?.unmute().then(lvt => {
            if (lvt) {
              setLocalVideoTrack(lvt);
            }
          });
          return prev;
        });
      }
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Box
        sx={videoChatWrapperStyles}
        className={styles.videoChatWrapper}
      >
        <Box className={styles.container}>
          <Box className={styles.screensWrapper}>
            <Box className={styles.screenOne}>
              {
                localAudioTrack ? (
                  <AudioRenderer
                    track={localAudioTrack}
                    isLocal={true}
                  />
                ) : (
                  null
                )
              }
              {
                localVideoTrack ? (
                  <VideoRenderer
                    className={styles.videoContent}
                    track={localVideoTrack}
                    isLocal={true}
                  />
                ) : (
                  <Cat4Icon className={styles.catIcon} />
                )
              }
              <Box className={styles.participantInfo}>
                {
                  (!localAudioTrack || localAudioTrack.isMuted) ?
                    <MuteMicrophoneIcon className={styles.microphoneIcon}/> :
                    <MicrophoneIcon className={styles.microphoneIcon}/>
                }
                <span className={styles.participantName}>
                  {name} (Me)
                </span>
              </Box>
            </Box>
            {
              participants.map((p) => (
                <Box
                  key={p.identity}
                  className={styles.screenOne}
                >
                  {
                    (p.audioTracks && p.audioTracks[0]) ?
                      <AudioRenderer
                        track={p.audioTracks[0]}
                        isLocal={false}
                      /> :
                      null
                  }
                  {
                    (p.videoTracks && p.videoTracks[0]) ?
                      <VideoRenderer
                        track={p.videoTracks[0]}
                        isLocal={false}
                      /> :
                      <Cat2Icon className={styles.catIcon}/>
                  }
                  <Box className={styles.participantInfo}>
                    {
                      (!p.audioTracks[0] || p.audioTracks[0].isMuted) ?
                        <MuteMicrophoneIcon className={styles.microphoneIcon}/> :
                        <MicrophoneIcon className={styles.microphoneIcon}/>
                    }
                    <span className={styles.participantName}>
                      {p.name}
                    </span>
                  </Box>
                </Box>
              ))
            }
            {
              catsArray.map((catIcon, index) =>
                index + 1 > participants.length ? 
                  <Box
                    key={index}
                    className={styles.screenOne}
                  >
                    {catIcon}
                  </Box> :
                  null
              )
            }
          </Box>
          <Box
            className={styles.btns}
            sx={toolBtnsStyles}
          >
            <Button
              className={styles.toolBtn}
              onClick={handleChangeMicrophone}
            >
              {
                isMicrophoneEnabled ?
                  <MicrophoneIcon className={styles.svgInToolBtn}/> :
                  <MuteMicrophoneIcon className={styles.svgInToolBtn}/>
              }
            </Button>
            <Button
              className={styles.toolBtn}
              onClick={handleChangeCamera}
            >
              {
                isCameraEnabled ?
                  <CameraIcon className={styles.svgInToolBtn}/> :
                  <MuteCameraIcon className={styles.svgInToolBtn}/>
              }
            </Button>
            <Button
              className={styles.toolBtn + ' ' + styles.exitBtn}
              onClick={handleExit}
            >
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
          sx={textChatWrapperStyles}
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
            <Typography variant="h2">
              Chat
            </Typography>
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
