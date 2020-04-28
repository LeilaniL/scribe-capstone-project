import React, { Component } from "react";
import LoadingIcon from "../LoadingIcon";
import CopyButton from "./CopyButton";
import "./TranscriptionBody.css";
import { encodeAudio, getTranscript } from "../../TranscriptService";

// styling
let fileUploadStyles = {
  display: "block",
  margin: "auto",
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
  tooltip.innerHTML = "Copied to clipboard";
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
      loading: false,
      value: "Your transcript will appear here",
      editing: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  editTranscript = () => {
    this.setState({ editing: true });
  };
  render() {
    return (
      <div style={transcriptStyles} className="with-shadow">
        <h4>
          Please select an audio file (.wav preferred) under 1 min in length:
        </h4>
        <input
          type="file"
          id="audioUpload"
          style={fileUploadStyles}
          onChange={(event) => {
            encodeAudio(event);
          }}
        />
        <button className="green-button buttonStyles" onClick={getTranscript}>
          Transcribe
        </button>
        <button
          className="blue-button buttonStyles"
          onClick={this.editTranscript}
        >
          Edit
        </button>
        <div className="paper">
          <textarea
            onChange={this.handleInputChange}
            value={this.state.value}
            style={fileUploadStyles}
          />
          {this.state.loading ? (
            <LoadingIcon />
          ) : (
            <p id="transcript" cols="125">
              {this.state.value}
            </p>
          )}
          <br />
          {this.state.editing ? (
            <button
              className="red-button buttonStyles"
              onClick={this.editTranscript}
            >
              Save
            </button>
          ) : null}
          {/* {this.state.loading ? <LoadingIcon /> : <p id="transcript">{this.state.transcriptText}</p>} */}
          {/* <CopyButton /> */}
        </div>
        <br />
      </div>
    );
  }
}

export default TranscriptionBody;
