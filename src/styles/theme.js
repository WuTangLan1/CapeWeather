// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
    },
    background: {
      default: '#0B0D21',
      paper: '#1A1C2E',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});