import fs from 'fs';
import testAudio from './00-father-william.wav';

// TODO fix audioData to get rid of readFileSync not a function error
// const audioData = fs.readFileSync(testAudio).toString('base64');

function audioData(event) {
    console.log("audio data called");
    console.log(event);
    console.log(event.target.result);
    let reader = new FileReader();
    // console.log("readAsDataURL :", reader.readAsDataURL(event));
    reader.onload = function (event) {
        let uploaded = event.target.result;
        console.log("Uploaded ", uploaded);
    }
}

export default audioData;