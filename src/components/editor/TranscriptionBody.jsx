import React, { Component } from "react";
// import getTranscript from '../getTranscript';
// import encodeAudio from '../getTranscript';
import apikey from "../../apikey";
import LoadingIcon from "../LoadingIcon";
import CopyButton from "./CopyButton";

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
  padding: "1em",
};

// TODO remove CopyButton to own component and lift state to EditorWorkspace
function copyAll() {
  let copyText = document.getElementById("transcript");
  copyText.select();
  document.execCommand("copy");

  let tooltip = document.getElementById("copyTooltip");
  tooltip.innerHTML = "Copy all to clipboard"
}

function outFunc() {
  let tooltip = document.getElementById("copyTooltip");
  tooltip.innerHTML = "Copied to clipboard";
}
// end of CopyButton

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
        <h4>Please select an audio file (.wav preferred) under 1 min in length:</h4>
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
          {/* <input  id="transcript"type="text" placeholder={this.state.transcriptText}></input> */}
          {/* <p id="transcript">To be or not to be that is the question Whether tis nobler in the mind to suffer the slings and arrows of Outrageous Fortune or to take arms against a sea of troubles and by opposing end them to die to sleep no more and by a sleep to say we end the heartache and a thousand natural shocks that flesh is heir to does a consummation devoutly to be wished to die to sleep to sleep perchance to Dream by there's the rub for in that sleep of death What Dreams May Come when we have shuffled off this Mortal coil must give us pause. There's the respect that makes Calamity of so long life.</p> */}
          {/* <button onClick={copyAll}>Copy All</button> */}
          {this.state.loading ? <LoadingIcon /> : <p id="transcript">{this.state.transcriptText}</p>}
          {/* <CopyButton /> */}
        </div>
        <br />
      </div>
    );
  }
}

export default TranscriptionBody;
