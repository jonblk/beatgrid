import { styled } from "@mui/system"
import { memo, useContext, useRef } from "react"
import { useSelector } from "react-redux"
import { ColorModeContext } from "../../colorModeContext"
import { useAppDispatch } from "../../hooks/hooks"
import { toggleStep } from "./gridSlice"

type StepProps = {
  isEnabled?: boolean
  stepIndex: number
  trackIndex: number
  size: number
}

const Step = ({isEnabled, trackIndex, stepIndex, size} : StepProps) => {
  const colorMode = useContext(ColorModeContext);
  /* keep track of hover state to prevent infinite rerendering
     when state is changed (if user hovers over a step while holding
     left mouse cursor) */
  const isHovered = useRef(false)
  const dispatch = useAppDispatch(); 

  const StyledButton = styled("button")(({ theme }) => {
    const activeColor = theme.palette.grid[`r${trackIndex}`] 
    const color = isEnabled ? activeColor : theme.palette.grid.empty
    return {
      ":hover": {opacity: isEnabled ? 1 : 0.4, boxShadow: `0px 0px 9px 3px hsla(${activeColor.slice(4,-1)},0.40)`, borderColor: theme.palette.grid[`r${trackIndex}`]},
      background: "none",
      boxShadow: "none",
      boxSizing: "border-box",
      width: `${size}rem`,
      height: `${size}rem`,
      active: {opacity: 0},
      borderRadius: "3px",
      border: `solid ${color} 2px`,
      ":active": {opacity: 0.8}
    }
  });

  const handleMouseUp = (e: any) => {
    dispatch(toggleStep({ trackIndex, stepIndex }))
  }

  const handleMouseEnter = (e: any) => {
    isHovered.current = true
  }

  const handleMouseLeave = (e: any) => {
    isHovered.current = false
    
    /* If the left mouse cursor is held down 
       then toggle state
    */
    if (e.buttons === 1) {
      dispatch(toggleStep({ trackIndex, stepIndex }));
    }
  }

  return (
    <StyledButton
      data-cy-trackstep={(16*trackIndex) + stepIndex}
      data-cy-isenabled={isEnabled ? "true" : "false"}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    ></StyledButton>
  );
}; 

export default memo(
  Step,
  (p, n) => p.size === n.size && p.isEnabled === n.isEnabled
);
