import React, { Component } from "react";
import TranscriptionBody from "./TranscriptionBody";
import EditorMenu from "./EditorMenu";
// let transcriptStyles = {
//   display: "inline-block",
//   float: "right"
// };
// let menuStyles = {
//   display: "inline-block",
//   float: "left"
// };
const EditorWorkspace = () => {
  return (
    <div>
      <TranscriptionBody />
      <EditorMenu />
    </div>
  );
};

export default EditorWorkspace;
