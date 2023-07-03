import { createTheme } from '@mui/material';
import { colors } from './colors';

export const theme = createTheme({
  typography: {
    fontSize: 16,
    allVariants: {
      letterSpacing: 0,
      fontVariationSettings:
        "'wdth' 130, 'GRAD' 0, 'slnt' 0, 'XTRA' 468, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738",
      color: colors.primary.white,
    },
    h1: {
      fontSize: 22,
      fontWeight: 600,
      lineHeight: '30px',
    },
    h2: {
      fontSize: 20,
      fontWeight: 800,
      lineHeight: '28px',
    },
    button: {
      fontSize: 16,
      fontWeight: 300,
      lineHeight: '24px',
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: '18px',
    },
  },
});
