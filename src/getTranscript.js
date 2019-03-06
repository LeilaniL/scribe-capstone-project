import apikey from './apikey';
// TODO fix audioData to get rid of readFileSync not a function error
// import audioData from './audioData';

function getTranscript() {
    // add Google Cloud project API key to src/apikey.js
    let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
    let config = {
        "encoding": "LINEAR16",
        "sampleRateHertz": 16000,
        "languageCode": "en-US"
    }
    let audio = {
        // "content": audioData
        // audioData = base64 encoded file (can get from https://www.giftofspeed.com/base64-encoder/)
    }
    let requestBody = {
        "audio": audio,
        "config": config,
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify(requestBody)
    }).then(res => res.json()).then(response => console.log('Success!', JSON.stringify(response))).catch(error => console.error('Error: ', error));
    alert("I was clicked");
}
export default getTranscript;