import React, { Component } from 'react';
import './App.css';
import TranscriptionBody from './TranscriptionBody';

var headerStyle = {
  textAlign: "center"
}
class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="App-header">
          <title>Scribe</title>
        </header>
        <h1 style={headerStyle}>Transcript</h1>
        <TranscriptionBody />
      </div>
    );
  }
}

export default App;
