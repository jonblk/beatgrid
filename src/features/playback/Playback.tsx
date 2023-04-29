import useEvent from "../../hooks/useEvent";

import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { incrementStepIndex } from "./playbackSlice";
import { play as playTrack } from "../../services/audio";
import { selectStepIndex, play, pause } from "./playbackSlice";
import { selectBPM } from "./playbackSlice";

const stepsPerBeat = 4;
export const MIN_BPM = 1;
export const MAX_BPM = 250;

/* This component handles the playback logic:

1. Increments the step index using setInterval
2. Plays audio 
3. Listens for spacebar presses (to toggle playback)

*/
export default function Playback() {
  const dispatch  = useAppDispatch();
  const bpm       = useSelector(selectBPM);
  const isPlaying = useAppSelector(state => state.playback.isPlaying);
  const tracks    = useAppSelector(state => state.grid.present.tracks);
  const stepIndex = useSelector(selectStepIndex);

  // Wrap this in custom use event hook
  // To allow us to access these properties without
  // causing the useEffect to constantly rerender
  // NOTE - replace with useEffectEvent when it becomes available 
  // in future react releases.
  const playAudio = useEvent(() => {
    tracks.forEach((t) => {
      t.steps.forEach((step,i) => {
        if (t.isEnabled && step.isEnabled && stepIndex === i) {
          playTrack(t.name);
        }
      })
    })

    return {} //?
  })

  useEffect(() => {
    const beatsPerSecond = bpm === "" ? 1 : bpm/60;
    const stepsPerSecond = beatsPerSecond*stepsPerBeat;
    const millisecondsPerStep = 1000/stepsPerSecond;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPlaying) {
        if(e.key === " ") {
          dispatch(pause())

          
          // PREVENT FOCUSED MUI BUTTONS FROM FIRING
          // WHEN PRESSING SPACEBAR!
          // NOTE - this is a hacky solution as MUI doesnt
          // allow you to disable spacebar activation (for accessibility reasons)
          e.preventDefault()
        }
      } else {
        if(e.key === " ") {
          dispatch(play())

          // PREVENT FOCUSED MUI BUTTONS FROM FIRING
          // WHEN PRESSING SPACEBAR!
          // NOTE - this is a hacky solution as MUI doesnt
          // allow you to disable spacebar activation (for accessibility reasons)
          e.preventDefault()
        }
      }
    }

    const onInterval = () => {
      if (isPlaying) {
        dispatch(incrementStepIndex())
        playAudio(tracks)
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    let interval = setInterval(onInterval, millisecondsPerStep)

    return(() => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval)
    })
  },[isPlaying, bpm])

  return(<></>)
}