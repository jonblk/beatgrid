import { Slider } from "@mui/material";
import { styled } from "@mui/system";

const boxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const ThinSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.main,
  height: 3,
  padding: '1rem 0',
  '&:active .MuiSlider-thumb': {
      backgroundColor: theme.palette.text.primary,
    },
  '& .MuiSlider-thumb': {
    height: "0.8rem",
    width: "0.8rem",
    boxShadow,
    backgroundColor: theme.palette.text.light,
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

export default ThinSlider;