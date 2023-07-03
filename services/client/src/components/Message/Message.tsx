import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Socket } from 'socket.io-client';
import { IMessage } from 'types/IMessage';
import styles from './Message.module.scss';
import { colors } from 'theme/colors';
import { formatTime } from 'utils/timeFormatter';

interface Props {
  msg: IMessage;
  socket: Socket;
  isFirstMessageInSequence: boolean;
  isLastMessageInSequence: boolean;
  isFirstMessageInChat: boolean;
}

const Message: React.FC<Props> = ({
  msg,
  socket,
  isFirstMessageInSequence,
  isLastMessageInSequence,
  isFirstMessageInChat,
}) => {
  const messageRowStyles = useMemo(
    () => ({
      justifyContent: msg.socketID !== socket.id ? 'flex-start' : 'flex-end',
      marginTop: isFirstMessageInChat
        ? 0
        : isFirstMessageInSequence
        ? '25px'
        : '10px',
    }),
    [isFirstMessageInChat, isFirstMessageInSequence, msg.socketID, socket.id]
  );
  const messageBlockStyles = useMemo(
    () => ({
      borderRadius:
        msg.socketID === socket.id && isLastMessageInSequence
          ? '12px 12px 4px 12px'
          : msg.socketID !== socket.id && isLastMessageInSequence
          ? '12px 12px 12px 4px'
          : '12px',
    }),
    [msg.socketID, socket.id, isLastMessageInSequence]
  );
  const messageAuthorStyles = useMemo(
    () => ({
      color:
        msg.socketID === socket.id
          ? colors.secondary.purple
          : colors.primary.blue,
    }),
    [isFirstMessageInChat, msg.socketID, socket.id]
  );
  const author = useMemo(
    () => (msg.socketID === socket.id ? 'You' : msg.name),
    [msg.socketID, socket.id, msg.name]
  );
  const formatedHours = useMemo(
    () => formatTime(msg.time.hours),
    [msg.time.hours]
  );
  const formatedMinutes = useMemo(
    () => formatTime(msg.time.minutes),
    [msg.time.minutes]
  );

  return (
    <Box
      sx={messageRowStyles}
      className={styles.messageRow}
    >
      <Box
        sx={messageBlockStyles}
        className={styles.messageBlock}
      >
        {isFirstMessageInSequence && (
          <Box
            sx={messageAuthorStyles}
            className={styles.messageAuthor}
          >
            {author}
          </Box>
        )}
        <Box className={styles.message}>
          <Box>{msg.text}</Box>
          <Box className={styles.messageTime}>
            {formatedHours}:{formatedMinutes}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
