import React, { Component } from "react";
import logo from "./logo.svg";
import AppHeader from "./components/Header";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <div id="content" />
      </div>
    );
  }
}

export default App;
