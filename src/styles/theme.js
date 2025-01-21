// src\styles\theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
      contrastText: '#0B0D21'
    },
    background: {
      default: '#0B0D21',
      paper: '#1A1C2E'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)'
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    body1: {
      lineHeight: 1.6
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          transition: 'all 0.2s ease'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }
      }
    }
  }
});