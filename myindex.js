// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient({
  keyFilename: 'key.json'
});

// The name of the audio file to transcribe
const fileName = './bisiklet.wav';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes,
};
const config = {
  encoding: 'wav',
  sampleRateHertz: 16000,
  audioChannelCount: 1,
  languageCode: 'tr-Tr',
 
};
const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file
console.time('İşlem süresi');
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    console.timeEnd('İşlem süresi');
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
  