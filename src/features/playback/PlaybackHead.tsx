import { styled } from "@mui/system";
import { selectStepIndex } from "./playbackSlice";
import { useSelector } from "react-redux";

/*
  * The playbackhead displays the current 
  * step index as the drum machine is played 
*/

const gap = 0.6; // gap between steps
const gapToPx = gap*8;  // 1 == 8px (in mui)
const oneRemToPx = 17;
const gapToRem =  gapToPx/oneRemToPx;

export default function PlaybackHead({stepSizeInRem }: {stepSizeInRem: number}) {
  const index = useSelector(selectStepIndex);
  const left = `${9 + (index*stepSizeInRem) + (stepSizeInRem/2) + (index*gapToRem)}rem`; 
  
  const StyledHead = styled("div")(({ theme }) => ({
    marginTop: 8,
    marginBottom: 8,
    position: "relative",
    left: left,
    width:  5,
    height: 8,
    background: theme.palette.text.primary,
  }));

  return (
    <div style={{ width: "100%" }}>
      <StyledHead />
    </div>
  );
}