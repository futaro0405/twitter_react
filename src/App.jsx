import './App.css';
import { RecoilRoot } from "recoil";

// mui
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { Router } from './containers/routers/Router';

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
  )
}

export default App
