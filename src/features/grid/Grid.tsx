import TrackRow from "./TrackRow";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectTracks } from "./gridSlice";
import usePureMouse from "../../hooks/usePureMouse";
import GridControls from "./GridControls";
import { PlaybackHead } from "../playback";
import { selectGridSizeInRem } from "../settings/settingsSlice";

const gap = 0.6; // gap between steps

export default function Grid() {
  const dispatch = useDispatch()
  const tracks = useSelector(selectTracks)

  // height of the track row
  const height = useSelector(selectGridSizeInRem);

  // Avoid text highlighting on mouse clicks within grid ui
  // to improve click and drag experience 
  // WARNING - 'PREVENT DEFAULT()' is used
  const ref = usePureMouse();

  return (
    <Stack alignItems="center">
      <Stack gap={gap} alignItems="center">
        <GridControls />
        <Stack ref={ref} gap={gap} alignItems="center">
          <PlaybackHead stepSizeInRem={height} />
          {tracks.map((t, i) => {
            return (
              <TrackRow
                gap={gap}
                height={height}
                key={t.name}
                isEnabled={t.isEnabled}
                name={t.name}
                index={t.index}
                steps={t.steps}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}