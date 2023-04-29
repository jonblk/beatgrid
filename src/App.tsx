import Grid from './features/grid/Grid';
import Playback from './features/playback/Playback';
import CssBaseline from '@mui/material/CssBaseline';
import PlaybackHead from './features/playback/PlaybackHead';
import GridControls from './features/grid/GridControls';
import { ColorModeContext } from './colorModeContext';
import { Container, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MainNav from './layouts/MainNav';
import useMUIThemes from './hooks/useMUIThemes';

export default function App() {
  const [theme, colorMode] = useMUIThemes();
  
  return (
    <>
      <Playback /> {/* playback controller */}
      
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainNav />
          <Grid />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}