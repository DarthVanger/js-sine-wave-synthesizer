// to play 1 second we need array of 44100 numbers
const sampleRate = 44100;

// create a typed array of size 44100 float numbers
const sineWaveArray = new Float32Array(sampleRate);

const hz = 440;

// fill all 44100 elements of array with Math.sin() values
for (i = 0; i < sineWaveArray.length; i++) {
  sineWaveArray[i] = Math.sin(i * Math.PI * 8 / hz);
}

/**
 * Play sound in browser
 * @param array - array of values from -1 to +1 representing sound
 * @param sampleRate - sampling rate to play with, e.g. 44100
 */
function playSound({ array, sampleRate }) {
  // We have to start with creating AudioContext
  const audioContext = new AudioContext({sampleRate});
  // create audio buffer of the same length as our array
  const audioBuffer = audioContext.createBuffer(1, array.length, sampleRate);
  // this copies our sine wave to the audio buffer
  audioBuffer.copyToChannel(array, 0);
  // some JavaScript magic to actually play the sound
  const source = audioContext.createBufferSource();
  source.connect(audioContext.destination);
  source.buffer = audioBuffer;
  source.start();
  console.log('ugh?');
  console.log('playing');
  console.log(array);
}

function playSineWave440hz() {
  playSound({ array: sineWaveArray, sampleRate });
}
