import React, { Component } from "react";
import "./App.css";
import PhoneList from "./components/PhoneList";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <PhoneList title="List 1" />
        <PhoneList title="List 2" />
        <PhoneList title="List 3" />
      </div>
    );
  }
}

export default App;
