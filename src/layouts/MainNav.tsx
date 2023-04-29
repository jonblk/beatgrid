import GitHubIcon from '@mui/icons-material/GitHub';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import CustomDrawer from '../components/CustomDrawer';
import SettingsMenu from '../features/settings/SettingsMenu';
import { useDrawer } from '../hooks/useDrawer';

export default function MainNav() {
  // handles MUI drawer logic
  const [state, toggleDrawer] = useDrawer()
  
  return (
    <>
      <Stack
        gap={1}
        pt={1}
        pr={1}
        width="100%"
        justifyContent="end"
        direction="row"
      >
        <a href="https://www.github.com/protonr/beatgrid" target="_blank">
          <IconButton color="primary">
            <GitHubIcon />
          </IconButton>
        </a>

        <div onClick={toggleDrawer("right", true)}>
          <IconButton color="inherit">
            <TuneOutlinedIcon />
          </IconButton>
        </div>
      </Stack>

      {/* Right side settings drawer.  Hidden until btn clicked */}
      <CustomDrawer
        state={state}
        name="Settings"
        toggleDrawer={toggleDrawer}
        anchor="right"
      >
        <SettingsMenu />
      </CustomDrawer>
    </>
  );
}