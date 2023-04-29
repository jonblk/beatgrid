import Step from "./Step";
import { styled } from "@mui/system";
import { memo,  useState } from "react";
import { useAppDispatch } from '../../hooks/hooks'
import { Stack, Typography } from "@mui/material";
import { ITrack, toggleTrackIsEnabled } from "./gridSlice";

const TrackRow = ({gap, height, index, name, steps, isEnabled} : ITrack & {height: number, gap: number} ) => {
  const [hovered, setHovered] = useState<number>(index);
  const dispatch = useAppDispatch();

  const StyledButton = styled("button")(({ theme }) => ({
    ":hover": {opacity: 0.5, cursor: "pointer"},
    background: theme.palette.background.dark,
    width: "1.5rem",
    height: "1.5rem",
    border: "none",
    color: theme.palette.text.primary,
    borderRadius: "50%",
  }));
  
  const onToggleEnable = (e: any, trackIndex: number) => {
    e.preventDefault();
    dispatch(toggleTrackIsEnabled({trackIndex}));
  }

  return (
    <Stack sx={{opacity: isEnabled ? 1 : 0.2}} direction="row" gap={"1rem"}  alignItems="center">
      {/* Track Info*/}
      <Stack direction="row" sx={{ textAlign: "left" }} width={"8rem"} alignItems="center">
        {/* Track Name */}
        <Typography sx={{flexGrow: 1}} variant="body1"> {name} </Typography>
        { /* Index */}
        <StyledButton data-cy-button={`track${index}toggle`} data-cy-isenabled={isEnabled ? "true" : "false"} onClick={(e) => onToggleEnable(e, index)}>
        {index}
      </StyledButton>
      </Stack>

      {/* Steps */}
      <Stack gap={0.6} height={`${height}rem`} direction="row" alignItems="stretch">
        {
          steps.map((s,i) => {
            return (
              <Step
                size={height}
                key={i}
                trackIndex={index}
                stepIndex={i}
                isEnabled={s.isEnabled}
              />
            );
          })
        }
      </Stack>
    </Stack>
  );
}

export default memo(TrackRow, (p, n) => {
  return (
    p.height == n.height &&
    n.steps.reduce(
      (acc, n1, i) => acc && n1.isEnabled === p.steps[i].isEnabled,
      true
    ) &&
    p.isEnabled === n.isEnabled
  );
}) 
 