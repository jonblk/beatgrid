import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { MAX_BPM } from './Playback'

// Define a type for the slice state
interface PlaybackState {
  isPlaying: boolean
  stepIndex: number
  bpm: number | ""
}

// Define the initial state using that type
const initialState: PlaybackState = {
  bpm: 120,
  isPlaying: false,
  stepIndex: 0
}

export const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    play: state => {
      state.isPlaying = true
    },
    pause: state => {
      state.isPlaying = false 
    },
    incrementStepIndex: state => {
      state.stepIndex = (state.stepIndex+1)%16 
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateBPM: (state, action: PayloadAction<string|number>) => {
      state.bpm = action.payload ? Math.min(MAX_BPM, Number(action.payload)) : "";
    },
  }
})

export const { updateBPM, incrementStepIndex, play, pause } = playbackSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBPM = (state: RootState) => state.playback.bpm
export const selectIsPlaying = (state: RootState) => state.playback.isPlaying
export const selectStepIndex = (state: RootState) => state.playback.stepIndex

export default playbackSlice.reducer