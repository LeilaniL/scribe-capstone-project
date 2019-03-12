import React, { Component } from "react";
// import getTranscript from '../getTranscript';
// import encodeAudio from '../getTranscript';
import apikey from "../../apikey";

// Placeholder for where transcribed audio will display
let transcriptText = "Your transcript will appear here";

// Encode audio file when user selects one
let encoded = null;
function encodeAudio(event) {
  // grab user-selected file
  let reader = new FileReader();
  const file = event.target.files[0];
  // convert file to string including base64
  reader.readAsDataURL(file);
  reader.onload = file => {
    // separate base64 from result string
    encoded = reader.result.split(",")[1];
    console.log("I am result split: ", encoded);
  };
}

// Send encoded audio data to Google API when button clicked

// transcriptText = { "results": [{ "alternatives": [{ "transcript": "you are old father William the young man said and your hair has become very white that you incessantly stand up on your head you think at your age this is right", "confidence": 0.9262686 }] }] };
function getTranscript() {
  // console.log(transcriptText.results[0].alternatives[0].transcript);
  // add Google Cloud project API key to src/apikey.js
  let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
  let config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US"
  };
  let audio = {
    content: encoded
  };
  let requestBody = {
    audio: audio,
    config: config
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .then(response => { transcriptText = (response.results[0].alternatives[0].transcript); console.log(transcriptText) })
    // .then(response => JSON.stringify(response))
    // .then(stringified => { transcriptText = stringified; console.log(transcriptText["results"]); return transcriptText })
    .catch(error => console.error("Error: ", error))
}

// styling
let fileUploadStyles = {
  display: "block",
  margin: "auto"
};
let transcriptStyles = {
  backgroundColor: "lightgray",
  width: "70%",
  display: "inline-block",
  float: "right",
  marginRight: "1em",
  padding: "1em"
};

class TranscriptionBody extends Component {
  state = {
    audioWasEncoded: "false",
    base64Data: ""
  };
  render() {
    return (
      <div style={transcriptStyles} className="with-shadow">
        <input
          type="file"
          id="audioUpload"
          style={fileUploadStyles}
          onChange={event => {
            encodeAudio(event);
          }}
        />
        <button className="green-button buttonStyles" onClick={getTranscript}>
          {" "}
          Transcribe
        </button>
        <div className="paper">
          <p>
            {transcriptText}
          </p>
        </div>
        {/* <button onClick={getTranscript} id="test" className="btn-lg btn-danger">Get Transcript</button> */}
        <br />
      </div>
    );
  }
}

export default TranscriptionBody;
