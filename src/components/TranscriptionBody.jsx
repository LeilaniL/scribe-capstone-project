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
                <button onClick={getTranscript} id="test" className="btn-lg btn-danger">Get Transcript</button>
                <br />
                <p>Lorem ipsum ipsum yo</p>
            </div>
        );
    }
}

export default TranscriptionBody;