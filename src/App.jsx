// src/App.jsx
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import store from './app/store';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Home />
      </Provider>
    </ThemeProvider>
  );
}

export default App;