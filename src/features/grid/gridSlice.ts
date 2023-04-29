import undoable from 'redux-undo'
import type { RootState } from '../../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const tracks = [
  'kick', 
  'snare', 
  'clap',
  'hihat-o', 
  'hihat-c', 
  'ride',
  'rim', 
  'egg',
  'tom-hi', 
  'tom-mid', 
]

export interface IStep {
  isEnabled: boolean // audio is disabled if false
}

export interface ITrack {
  index: number,
  name: string,
  isEnabled: boolean, // audio is disabled for all steps if false
  steps: IStep[], // fixed 16 steps (4 beats)
}

interface ILastEdit {
  track: number | null 
  step:  number | null
}

// Define a type for the slice state
interface IGridState {
  tracks: ITrack[]
}

// Define the initial state using that type
const initialState: IGridState = {
  tracks: tracks.map((t,i) => ({
    index: i,
    name: t,
    isEnabled: true,
    steps: Array(16).fill({isEnabled: false})
  })),
}

const getStep = (i: number, ii: number, s: IGridState) =>  s.tracks[i].steps[ii]

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    toggleTrackIsEnabled: (state, action: PayloadAction<{trackIndex: number}>) => {
      const i = action.payload.trackIndex;
      state.tracks[i].isEnabled = !state.tracks[i].isEnabled;
    },
    clearEnabledSteps: (state) => {
      state.tracks.forEach(t => {
        t.steps.forEach(s => {
          s.isEnabled = false
        })
      })
    },
    toggleStep: (state, action: PayloadAction<{trackIndex: number, stepIndex: number}>) => {
      const step = getStep(action.payload.trackIndex, action.payload.stepIndex, state)
      step.isEnabled = !step.isEnabled;
    },
    enableStep: (state, action: PayloadAction<{trackIndex: number, stepIndex: number}>) => {
      const step = getStep(action.payload.trackIndex, action.payload.stepIndex, state)
      if(step && !step.isEnabled) {
        step.isEnabled = true;
      }
    },
    disableStep: (state, action: PayloadAction<{trackIndex: number, stepIndex: number}>) => {
      const step = getStep(action.payload.trackIndex, action.payload.stepIndex, state)
      if(step && step.isEnabled) {
        step.isEnabled = false;
      }
    },
  }
})

export const { toggleStep, disableStep, enableStep, toggleTrackIsEnabled, clearEnabledSteps } = gridSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTracks  = (state: RootState)      =>  state.grid.present.tracks; 
export const selectTrack   = (i: number, ii: number) => (state: RootState) => state.grid.present.tracks[i].steps[ii].isEnabled;
export const selectCanUndo = (state: RootState)      =>  state.grid.past.length     > 0;
export const selectCanRedo = (state: RootState)      =>  state.grid.future.length   > 0;
export default undoable(gridSlice.reducer, { limit: 20 });