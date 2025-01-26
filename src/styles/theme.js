// src/styles/theme.js
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#00e5ff',
      contrastText: '#0B0D21',
    },
    secondary: {
      main: '#ff4081',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#0B0D21',
      paper: '#1A1C2E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    body1: {
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiContainer: {
      root: {
        spacing: 4
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          padding: '10px 20px',
          '&:hover': {
            boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.3)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            borderColor: '#00e5ff',
            backgroundColor: 'rgba(0, 229, 255, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
            },
          },
        },
      },
    },
  },
});
