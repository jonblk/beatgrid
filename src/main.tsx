import ReactDOM from 'react-dom/client'
import App from './App'

import { tracks } from './features/grid/gridSlice';
import { Provider } from 'react-redux';

import { load } from './services/localstorge';
import { createAudioBuffers } from './services/audio';
import { initializeStore } from './store';
import { StrictMode } from 'react';

import { updateGain as updateMainGainNode } from "./services/audio";

//Load audio buffers into memory
createAudioBuffers(tracks);

//Get saved settings from local storage
const savedSettings = load("settings");

const store = initializeStore(savedSettings);

// Update the audio gain node
updateMainGainNode(store.getState().settings.gain/100)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store} >
      <App/>
    </Provider>
  </StrictMode>
)
