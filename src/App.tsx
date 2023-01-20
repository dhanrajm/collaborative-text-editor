import React from "react";
import "./App.css";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { TextAreaBinding } from "y-textarea";
import { randomColor, randomName } from "./helpers";

// generate a random name for the client
const clientName = randomName();
// generate a random color for the client
const color = randomColor();

function App() {
  // do the required initialization on mount
  React.useEffect(() => {
    // instantiate the Yjs doc
    const doc = new Y.Doc();
    
    // instantiate server connection and tie it with yjs doc object
    const wsProvider = new WebsocketProvider(
      `ws://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`,
      "",
      doc
    );

    wsProvider.on("status", (event: any) => {
      // logs "connected" or "disconnected" to check server connection
      console.log(event.status);
    });

    // textarea tag has "#textArea" id. So use that to get the node
    const textArea = document.querySelector<HTMLTextAreaElement>("#textArea");
    if (!textArea) throw new Error("missing Text area?");

    const yText = doc.getText("textArea");
    // bind the DOM textarea to yjs text
    const areaBinding = new TextAreaBinding(yText, textArea, {
      awareness: wsProvider.awareness,
      clientName,
      color,
    });

    return () => {
      // destroy the textarea binding on unmount
      areaBinding.destroy();
    };
  }, []);

  return (
    <div className="App">
      <textarea
        id="textArea"
        className="container"
        onChange={(e) => {
          e.target.style.height = `${e.target.scrollHeight}`;
        }}
      ></textarea>
    </div>
  );
}

export default App;
