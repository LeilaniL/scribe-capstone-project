import React, { Component } from 'react';
import './App.css';
import TranscriptionBody from './TranscriptionBody';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="App-header">
          <title>Scribe</title>
        </header>
        <h1>Transcript</h1>
        <TranscriptionBody />
      </div>
    );
  }
}

export default App;
