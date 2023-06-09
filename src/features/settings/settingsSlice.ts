import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { updateGain as updateMainGainNode } from "../../services/audio";
import { saveState } from '../../services/localstorge';

// Define a type for the slice state
export interface ISettingsState {
  prev_gain: number,
  gain: number 
  hue:  number
  gridSize: number
}

// Define the initial state using that type
const initialState: ISettingsState = {
  prev_gain: 0,
  gain: 0,  //  (-99 - 100)
  hue:  50, //  (0   - 1)
  gridSize: 6 // (0 - 20)
}

const onUpdate = (state: ISettingsState) => {
  saveState("settings", state)
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleOffGain: (state) => {
      state.prev_gain = state.gain;

      // update state
      state.gain = -100 

      // update audio gain node
      updateMainGainNode(-1)

      // save settings to localstorage
      onUpdate(state)
    },
    toggleOnGain: (state) => {
      state.gain = state.prev_gain;

      // update audio gain node
      updateMainGainNode(state.gain/100)

      // save settings to localstorage
      onUpdate(state)
    },
    updateGain: (state, action: PayloadAction<number>) => {
      // update state
      state.gain = action.payload

      // update audio gain node
      updateMainGainNode(action.payload/100)

      // save settings to localstorage
      onUpdate(state)
    },
    updateHue: (state, action: PayloadAction<number>) => {
      // update state
      state.hue = action.payload

      // save settings to localstorage
      onUpdate(state)
    },
    updateGridSize: (state, action: PayloadAction<number>) => {
      // update state
      state.gridSize = action.payload

      // save settings to localstorage
      onUpdate(state)
    }
  }
})

function map_range(v: number, l1:number, h1:number, l2:number, h2: number) {
    return l2 + (h2 - l2) * (v - l1) / (h1 - l1);
}

export const { updateGain, updateHue, updateGridSize, toggleOffGain, toggleOnGain } = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGain = (state: RootState) => state.settings.gain
export const selectPrevGain = (state: RootState) => state.settings.prev_gain
export const selectHue = (state: RootState) => state.settings.hue
export const selectGridSizeInRem = (state: RootState) => map_range(state.settings.gridSize, 0, 20, 1.8, 3.1) 
export const selectGridSize = (state: RootState) => state.settings.gridSize

export default settingsSlice.reducer