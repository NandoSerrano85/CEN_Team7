import React, { Component } from "react";
import AppHeader from "./components/Header";
import Books from "./scenes/Books/Books";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="content">
          <Books className="Books" />
        </div>
      </div>
    );
  }
}

export default App;
