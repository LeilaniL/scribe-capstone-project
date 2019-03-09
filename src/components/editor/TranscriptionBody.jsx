import React, { Component } from "react";
// import getTranscript from '../getTranscript';
// import encodeAudio from '../getTranscript';
import apikey from "../../apikey";

// Encode audio file when user selects one
var encoded;
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

function getTranscript() {
  // add Google Cloud project API key to src/apikey.js
  let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
  let config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US"
  };
  let audio = {
    content: encoded
    // audioData = base64 encoded file (can get from https://www.giftofspeed.com/base64-encoder/)
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
    .then(response => console.log("Success!", JSON.stringify(response)))
    .catch(error => console.error("Error: ", error));
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
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?"
          </p>
        </div>
        {/* <button onClick={getTranscript} id="test" className="btn-lg btn-danger">Get Transcript</button> */}
        <br />
      </div>
    );
  }
}

export default TranscriptionBody;
