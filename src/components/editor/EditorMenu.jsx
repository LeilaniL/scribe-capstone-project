import React, { Component } from "react";

let menuStyles = {
  display: "inline-block",
  float: "left",
  marginLeft: "3em",
  padding: "1em"
};
// let wipStyles = {
//   backgroundColor: "black",
//   // zIndex: 1
// }
function wipAlert() {
  alert("Hi! I'm a useless button currently. This site is still under construction, but thanks for visiting!");
}
class EditorMenu extends Component {
  state = {
    highlightColor: "null"
  };
  render() {
    return (
      <div className="with-shadow" style={menuStyles}>
        <h4>Select highlighter color:</h4>
        <button className="blue-button buttonStyles" onClick={wipAlert}></button>
        <button className="red-button buttonStyles" onClick={wipAlert}></button>
        <button className="green-button buttonStyles" onClick={wipAlert}></button>
        <button className="rounded-button buttonStyles" onClick={wipAlert}>+</button>
      </div>

    );
  }
}

export default EditorMenu;
