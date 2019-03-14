import React, { Component } from "react";
// import getTranscript from '../getTranscript';
// import encodeAudio from '../getTranscript';
import apikey from "../../apikey";
import LoadingIcon from "../LoadingIcon";
import CopyButton from "./CopyButton";
import "./TranscriptionBody.css";

// Encode audio file when user selects one
let encoded = null;
function encodeAudio(event) {
  // grab user-selected file
  let reader = new FileReader();
  try {
    const file = event.target.files[0];
    // convert file to string including base64
    reader.readAsDataURL(file);
    reader.onload = file => {
      // separate base64 from result string
      encoded = reader.result.split(",")[1];
      console.log(encoded);
    };
  }
  catch {
    alert("Uh oh, an error occurred. Please try again. Did you select a .wav file less than a minute long?");
  }
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
  document.getElementById("transcript").select();
  document.execCommand("copy");
  let tooltip = document.getElementById("copyTooltip");
  tooltip.innerHTML = "Copied to clipboard"
}

function outFunc() {
  let tooltip = document.getElementById("copyTooltip");
  tooltip.innerHTML = "Copy all to clipboard";
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
        console.log(response);
        this.setState({ loading: false });
        let newText = (response.results[0].alternatives[0].transcript);
        this.setState({ transcriptText: newText })
      })
      .catch(error => {
        console.error("Error: ", error);
        let newText = "An error occurred. Please select another file.";
        this.setState({transcriptText: newText})
      })
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
          {this.state.loading ? <LoadingIcon /> :  <p id="transcript" cols="125">{this.state.transcriptText}</p>}
         
          <br/>
          <div className="tooltip">
            <button onClick={copyAll} onMouseOut={outFunc}>Copy All</button>
            <span className="tooltiptext" id="copyTooltip"></span>
          </div>
          {/* {this.state.loading ? <LoadingIcon /> : <p id="transcript">{this.state.transcriptText}</p>} */}
          {/* <CopyButton /> */}
        </div>
        <br />
      </div>
    );
  }
}

export default TranscriptionBody;
