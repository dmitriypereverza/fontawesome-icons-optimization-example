import React from "react";
import reactLogo from "./assets/react.svg";

import { Icon } from "./components/Icon";

import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={reactLogo} className="logo react" alt="React logo" />
      <div className="card">
        <Icon name="farFaceSmile" size="3x" />
      </div>
    </div>
  );
}

export default App;
