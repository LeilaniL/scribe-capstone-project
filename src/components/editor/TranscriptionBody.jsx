import React, { Component } from "react";
// import getTranscript from '../getTranscript';
// import encodeAudio from '../getTranscript';
import apikey from "../../apikey";
import LoadingIcon from "../LoadingIcon";

// Placeholder for where transcribed audio will display
// let transcriptText = "Your transcript will appear here";

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
  constructor(props) {
    super(props);
    this.state = {
      // audioWasEncoded: "false",
      // base64Data: ""
      loading: false,
      transcriptText: "Your transcript will appear here"
    };
    this.getTranscript = this.getTranscript.bind(this);
  }
  // Send encoded audio data to Google API when button clicked
  getTranscript() {
    // add Google Cloud project API key to src/apikey.js
    this.setState({ loading: true });
    let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
    let config = {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
      enableAutomaticPunctuation: true
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
      .then(response => {
        this.setState({ loading: false });
        let newText = (response.results[0].alternatives[0].transcript); console.log(newText);
        this.setState({ transcriptText: newText })
      })
      .catch(error => console.error("Error: ", error))
  }

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
        <button className="green-button buttonStyles" onClick={this.getTranscript}>
          Transcribe
        </button>
        <div className="paper">
          {/* <input type="text" placeholder={this.state.transcriptText}></input> */}

          {this.state.loading ? <LoadingIcon /> : <p>{this.state.transcriptText}</p>}
        </div>
        <br />
      </div>
    );
  }
}

export default TranscriptionBody;
