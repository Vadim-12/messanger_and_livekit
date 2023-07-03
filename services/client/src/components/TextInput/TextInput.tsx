import { Button, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import SendMessageIcon from 'ui/icons/chat/SendMessageIcon';
import { colors } from 'theme/colors';
import styles from './TextInput.module.scss';

interface Props {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLElement>) => void;
}

const TextInput: React.FC<Props> = ({
  inputMessage,
  setInputMessage,
  sendMessage,
}) => {
  const inputStyles = useMemo(
    () => ({
      position: 'absolute',
      bottom: 12,
      left: 12,
      width: 'calc(100% - 24px)',
      '& .MuiInputBase-root': {
        background: colors.primary.black,
        color: inputMessage.length
          ? colors.primary.white
          : colors.overlay.white.white25,
        borderRadius: '11px',
        height: '50px',
        fontSize: 16,
        fontWeight: 300,
      },
      '& fieldset': {
        border: 'none',
      },
      '& .Mui-focused': {
        border: `1px solid ${colors.overlay.white.white25}`,
        color: colors.primary.white,

        '& .MuiInputBase-root': {
          background: colors.primary.grayDark,
        },
      },
    }),
    [inputMessage]
  );
  const sendMessageButtonStyles = useMemo(
    () => ({
      minWidth: 0,
      minHeight: 0,
      width: '34px',
      height: '34px',
      padding: 0,
    }),
    []
  );

  return (
    <TextField
      fullWidth
      autoCorrect="off"
      autoCapitalize="off"
      autoComplete="off"
      sx={inputStyles}
      className={styles.input}
      value={inputMessage}
      placeholder="Start typing"
      onChange={(e) => setInputMessage(e.target.value)}
      InputProps={{
        endAdornment: (
          <Button
            sx={sendMessageButtonStyles}
            type="submit"
            onClick={sendMessage}
          >
            <SendMessageIcon />
          </Button>
        ),
      }}
    />
  );
};

export default TextInput;
