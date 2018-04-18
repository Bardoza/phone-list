import React, { Component } from "react";
import "./App.css";
import PhoneList from "./components/PhoneList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PhoneList />
      </div>
    );
  }
}

export default App;
