import { tracks } from "../features/grid/gridSlice";

// NOTEJSDOM does not support window.AudioContext
// use this library for audio testing in the future
// https://github.com/jsdom/jsdom/issues/2900
//import { AudioContext } from 'standardized-audio-context';
//const audioContext = new AudioContext();

const audioContext = new (window.AudioContext)();

export const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination)

interface IAudioBuffers {
  [key:string]: AudioBuffer | null
}

export const updateGain = (v: number) =>  {
  gainNode.gain.value = Math.max(-1, Math.min(v,1))
}

const buffers: IAudioBuffers = tracks.reduce((
  (acc: IAudioBuffers, v: string) => {
    acc[v] = null; return acc
  }), {}
);

export const createAudioBuffers = async (trackNames: string[]) => {
  for(const name of trackNames) {
    let response = await fetch(`./samples/${name}.wav`)
    if (response.ok) {
      let buffer = await response.arrayBuffer()
      let ab: AudioBuffer = await audioContext.decodeAudioData(buffer)
      buffers[name] = ab;
    } else {
      alert(`ERROR - Audio file not found: ${name}.wav`)
    }
  };
};

export const play = (name: string) => {
  const buffersource = audioContext.createBufferSource();
  buffersource.buffer = buffers[name]
  buffersource.connect(audioContext.destination)
  buffersource.connect(gainNode)
  buffersource.start()
}