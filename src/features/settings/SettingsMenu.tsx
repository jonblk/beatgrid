import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { selectGridSize, selectHue, updateGridSize, updateHue } from './settingsSlice'; 
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ThinSlider from '../../components/ThinSlider';

export default function SettingsMenu() {
  const dispatch = useDispatch()
  const hue = useSelector(selectHue);
  const gridSize = useSelector(selectGridSize);

  const handleHueChange = (event: Event, newValue: number | number[]) => {
    dispatch(updateHue(Number(newValue)));
  };
  
  const handleGridSizeChange = (event: Event, newValue: number | number[]) => {
    dispatch(updateGridSize(Number(newValue)));
  }

  return (
    <Stack m={3} gap={0}>
      <Box>
        {/* HUE */}
        <Typography variant="body1"> Hue </Typography>
        <ThinSlider
          value={hue}
          step={20}
          min={0}
          max={360}
          onChange={handleHueChange}
        />
      </Box>

      <Box>
        {/* GRID SIZE */}
        <Typography variant="body1"> Grid Size </Typography>
        <ThinSlider
          value={gridSize}
          step={1}
          min={0}
          max={20}
          onChange={handleGridSizeChange}
        />
      </Box>
    </Stack>
  );
}