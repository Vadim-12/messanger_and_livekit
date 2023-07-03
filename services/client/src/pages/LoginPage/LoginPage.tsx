import React, { useEffect, useMemo, useState } from 'react';
import styles from './LoginPage.module.scss';
import { Box, Button, TextField, Typography } from '@mui/material';
import CatIcon from 'ui/icons/cats/CatIcon';
import axios from 'axios';
import { API_USERS_PERMISSION_URL } from 'config/const/routes/api/users/permission';
import { useNavigate } from 'react-router-dom';
import { colors } from 'theme/colors';
import { ROOM_ROUTE } from 'config/const/routes/website/room';
import { ROOM_IS_FULL_ROUTE } from 'config/const/routes/website/room/isFull';

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPage: React.FC<Props> = ({ name, setName }) => {
  const [validationError, setValidationError] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const navigate = useNavigate();

  const isValidate = useMemo(() => {
    return name.length > 0;
  }, [name]);

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isValidate) {
      setValidationError(false);
      try {
        const response = await axios.get<{ permission: boolean }>(
          API_USERS_PERMISSION_URL
        );
        const { permission = false } = response.data;
        if (permission) {
          navigate(ROOM_ROUTE);
        } else {
          navigate(ROOM_IS_FULL_ROUTE);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setValidationError(true);
    }
  }

  useEffect(() => {
    setValidationError(false);
    setName(name.trim());
  }, [name]);

  const helperText = useMemo(
    () => (validationError && !focus ? '* Please enter your name' : ''),
    [validationError, focus]
  );
  const inputStyles = useMemo(
    () => ({
      '& .MuiInputBase-root': {
        background: colors.primary.gray,
        color: colors.primary.white,
        borderRadius: '11px',
        fontWeight: 300,
        fontSize: 16,
        caretColor: colors.primary.blue,

        '&::placeholder': {
          color: colors.overlay.white.white25,
        },
      },
      '& fieldset': {
        border:
          validationError && !focus
            ? `1px solid ${colors.secondary.red}`
            : 'none',
      },
      '& .Mui-focused': {
        border: `1px solid ${colors.primary.blue}`,
      },
    }),
    [validationError, focus]
  );
  const submitBtnStyles = useMemo(
    () => ({
      mt: 3,
      color: colors.primary.white,
      background: colors.primary.blue,
      borderRadius: '10px',
      boxSizing: 'border-box',
      height: 48,
      fontWeight: 500,
      textTransform: 'initial',
      '&:hover': {
        background: colors.primary.blueMore,
      },
    }),
    []
  );
  const isError = useMemo(
    () => validationError && !focus,
    [validationError, focus]
  );

  return (
    <Box className={styles.wrapper}>
      <Box
        component="form"
        onSubmit={handleSubmitForm}
        autoComplete="off"
        className={styles.form}
      >
        <CatIcon className={styles.CatIcon} />
        <Typography
          variant="h1"
          m="12px 0 24px 0"
        >
          Enter your name
        </Typography>
        <TextField
          id="outlined-basic"
          placeholder="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={isError}
          helperText={helperText}
          fullWidth
          sx={inputStyles}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <Button
          variant="outlined"
          type="submit"
          fullWidth sx={submitBtnStyles}
        >
          Join the room
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
