import ReactDOM from 'react-dom/client'
import App from './App'

import { tracks } from './features/grid/gridSlice';
import { Provider } from 'react-redux';

import { load } from './services/localstorge';
import { createAudioBuffers } from './services/audio';
import { initializeStore } from './store';
import { StrictMode } from 'react';

//Load audio buffers into memory
createAudioBuffers(tracks);

//Get saved settings from local storage
const savedSettings = load("settings");

const store = initializeStore(savedSettings);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store} >
      <App/>
    </Provider>
  </StrictMode>
)
