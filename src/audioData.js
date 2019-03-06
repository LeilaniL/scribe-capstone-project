import fs from 'fs';
import testAudio from './00-father-william.wav';

// TODO fix audioData to get rid of readFileSync not a function error
const audioData = fs.readFileSync(testAudio).toString('base64');

export default audioData;