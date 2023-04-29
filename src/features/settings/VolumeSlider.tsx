import {useState} from 'react';
import {IconButton} from '@mui/material';
import Stack from '@mui/material/Stack';

const min = -100;
const max = 100;

import { useSelector } from 'react-redux';
import { selectGain, updateGain } from './settingsSlice';
import { useDispatch } from 'react-redux';
import { VolumeMuteOutlined, VolumeUpOutlined } from '@mui/icons-material';
import ThinSlider from '../../components/ThinSlider';

export default function VolumeSlider() {
  const gain = useSelector(selectGain)
  const [prevGain, setPrevGain] = useState(gain)
  const dispatch = useDispatch()

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(updateGain(Number(newValue)));
  };

  const handleToggle = (event: any) => {
    if (gain === min) {
      dispatch(updateGain(prevGain))
    } else {
      setPrevGain(gain)
      dispatch(updateGain(min))
    }
  }

  return (
    <Stack spacing={0} direction="row" sx={{  width: 100 }} alignItems="center">
      <IconButton onClick={handleToggle} color="inherit">
        { gain === min ? <VolumeMuteOutlined data-cy-icon="mute"/> : <VolumeUpOutlined data-cy-icon="volumeup"/> }
      </IconButton>
      <ThinSlider sx={{display: gain===min ? "none": "auto"}}  min={min+1} max={max} size="medium" color="primary" aria-label="Volume" value={gain} onChange={handleChange} />
    </Stack>
  );
}



