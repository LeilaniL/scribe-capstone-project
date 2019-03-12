import React, { Component } from "react";

let menuStyles = {
  display: "inline-block",
  float: "left",
  marginLeft: "3em",
  padding: "1em"
};
// let buttonStyles = {
//   margin: "auto",
//   marginTop: "1em"
// };

class EditorMenu extends Component {
  state = {
    highlightColor: "null"
  };
  render() {
    return (
      <div className="with-shadow" style={menuStyles}>
        <h4>Select highlighter color:</h4>
        <button className="blue-button buttonStyles"></button>
        <button className="red-button buttonStyles"></button>
        <button className="green-button buttonStyles"></button>
        <button className="rounded-button buttonStyles">+</button>
      </div>
    );
  }
}

export default EditorMenu;
