import './App.css'
import { RecoilRoot } from "recoil";
import { Router } from './routes/Router';
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

function App() {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark': 'light'
    }
  })

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App
