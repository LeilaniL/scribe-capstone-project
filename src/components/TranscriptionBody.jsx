import React, { Component } from 'react';
import getTranscript from '../getTranscript';

var transcriptStyles = {
    backgroundColor: 'lightgray',
    width: '33%',
    margin: 'auto',
    padding: '1em',
    borderRadius: '3%'
}

class TranscriptionBody extends Component {
    // state = {  }
    render() {
        return (
            <div style={transcriptStyles}>
                <div class="paper">
                    <p>Lorem ipsum ipsum yo</p>
                </div>
                {/* <button onClick={getTranscript} id="test" className="btn-lg btn-danger">Get Transcript</button> */}
                <button onClick={getTranscript} class="green-button"> Transcribe</button>
                <br />
            </div>
        );
    }
}

export default TranscriptionBody;