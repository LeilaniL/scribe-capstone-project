import React, { Component } from 'react';
import getTranscript from '../getTranscript';
// import audioData from '../audioData';

var transcriptStyles = {
    backgroundColor: 'lightgray',
    width: '33%',
    margin: 'auto',
    padding: '1em',
    borderRadius: '3%'
}

let event;
class TranscriptionBody extends Component {
    // state = {  }
    audioData(event) {
        console.log("audio data called");
        console.log(event.target.files[0]);
        // console.log(event.target.result);
        let reader = new FileReader();
        const file = event.target.files[0]
        console.log("readAsDataURL :", reader.readAsDataURL(file));
        reader.onload = (file) => {
            console.log(reader.result)
        }
    }
    render() {
        return (
            <div style={transcriptStyles}>
                <div className="paper">
                    <p>Lorem ipsum ipsum yo</p>
                </div>
                {/* <button onClick={getTranscript} id="test" className="btn-lg btn-danger">Get Transcript</button> */}
                <input type="file" id="audioUpload" onChange={(event) => { this.audioData(event) }}></input>
                <button className="green-button"> Transcribe</button>
                <br />
            </div>
        );
    }
}

export default TranscriptionBody;