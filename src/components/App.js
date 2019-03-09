import React, { Component } from "react";
import "./App.css";
import EditorWorkspace from "./editor/EditorWorkspace";

var headerStyle = {
  textAlign: "center",
  color: "#8c42ab"
};
class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="App-header">
          <title>Scribe</title>
        </header>
        <h1 style={headerStyle}>Scribe App</h1>
        <EditorWorkspace />
      </div>
    );
  }
}

export default App;
