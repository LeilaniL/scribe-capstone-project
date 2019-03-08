import React, { Component } from 'react';
// import getTranscript from '../getTranscript';
// import encodeAudio from '../getTranscript';
import apikey from '../apikey';

// Encode audio file when user selects one
var encoded;
function encodeAudio(event) {
    // grab user-selected file
    let reader = new FileReader();
    const file = event.target.files[0];
    // convert file to string including base64
    reader.readAsDataURL(file);
    reader.onload = (file) => {
        // separate base64 from result string
        encoded = reader.result.split(",");
        console.log("I am result split: ", encoded[1])
    }
}

// Send encoded audio data to Google API when button clicked

function getTranscript(encoded) {
    console.log("I am encoded inside getTranscript", encoded);
    // add Google Cloud project API key to src/apikey.js
    let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
    let config = {
        "encoding": "LINEAR16",
        "sampleRateHertz": 16000,
        "languageCode": "en-US"
    }
    let audio = {
        "content": encoded
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
var transcriptStyles = {
    backgroundColor: 'lightgray',
    minWidth: '33%',
    margin: 'auto',
    padding: '1em',
    borderRadius: '3%'
}

class TranscriptionBody extends Component {
    state = {
        audioWasEncoded: "false",
        base64Data: ""
    }
    render() {
        return (
            <div style={transcriptStyles}>
                <div className="paper">
                    <p>Lorem ipsum ipsum yo</p>
                </div>
                {/* <button onClick={getTranscript} id="test" className="btn-lg btn-danger">Get Transcript</button> */}
                <input type="file" id="audioUpload" onChange={(event) => { encodeAudio(event) }}></input>
                <button className="green-button" onClick={getTranscript}> Transcribe</button>
                <br />
            </div>
        );
    }
}

export default TranscriptionBody;