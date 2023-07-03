import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from 'theme/colors';
import Cat4Icon from 'ui/icons/cats/Cat4Icon';
import styles from './RoomIsFullPage.module.scss';
import { LOGIN_ROUTE } from 'config/const/routes/website/login';

const RoomIsFullPage: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = useCallback(() => navigate(LOGIN_ROUTE), []);

  const backButtonStyles = useMemo(
    () => ({
      color: 'black',
      background: colors.primary.white,
      borderRadius: '10px',
      boxSizing: 'border-box',
      height: 48,
      textTransform: 'initial',
      '&:hover': {
        background: colors.overlay.white.white75,
        border: 'none',
      },
    }),
    []
  );

  return (
    <Box className={styles.wrapper}>
      <Box
        component="form"
        onSubmit={onSubmit}
        autoComplete="off"
        className={styles.form}
      >
        <Cat4Icon
          width="100%"
          className={styles.catIcon}
        />
        <Typography
          variant="h1"
          mb="24px"
        >
          Room is full
        </Typography>
        <Button
          variant="outlined"
          type="submit"
          fullWidth
          sx={backButtonStyles}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default RoomIsFullPage;
