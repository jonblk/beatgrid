import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';
import { useSelector } from 'react-redux';
import { selectBPM, updateBPM } from '.';
import { useDispatch } from 'react-redux';
import { MAX_BPM, MIN_BPM } from './Playback';
import { Stack } from '@mui/material';
import ThinSlider from '../../components/ThinSlider';

const StyledInput = styled(MuiInput)`
  width: 45px;
  font-size: 0.9rem;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const BpmControls = () => {
  const value = useSelector(selectBPM)
  const dispatch = useDispatch()

  const handleChange = (event: any, value?: number | number[]  ) => {
    dispatch(updateBPM(Number(value ? value : (event as React.ChangeEvent<HTMLInputElement>).target.value)));
  };

  return (
    <Stack gap={1} direction="row">
      <ThinSlider
        min={MIN_BPM}
        max={MAX_BPM}
        value={value === "" ? 0 : value}
        data-cy-slider="bpm"
        data-cy-value={value}
        onChange={handleChange}
        style={{ width: "60px" }}
        size="small"
      />
      <StyledInput
        disableUnderline={true} // it looks ugly with underline
        value={value}
        size="medium"
        fullWidth={true}
        onChange={handleChange}
        onFocus={e => e.target.select()}
        inputProps={{
          step: 1,
          min: MIN_BPM,
          max: MAX_BPM,
          type: "number",
          "data-cy-input": "bpm"
        }}
      />
    </Stack>
  );
}

export default BpmControls;