// import apikey from './apikey';
// import encodeAudio from './encodeAudio';

// function getTranscript(encoded) {
//     console.log("I am encoded inside getTranscript", encoded);
//     // add Google Cloud project API key to src/apikey.js
//     let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
//     let config = {
//         "encoding": "LINEAR16",
//         "sampleRateHertz": 16000,
//         "languageCode": "en-US"
//     }
//     let audio = {
//         // "content": audioData
//         // audioData = base64 encoded file (can get from https://www.giftofspeed.com/base64-encoder/)
//     }
//     let requestBody = {
//         "audio": audio,
//         "config": config,
//     }

//     // fetch(url, {
//     //     method: "POST",
//     //     body: JSON.stringify(requestBody)
//     // }).then(res => res.json()).then(response => console.log('Success!', JSON.stringify(response))).catch(error => console.error('Error: ', error));
//     // alert("I was clicked");
// }
// export default getTranscript;