import React, { Component } from "react";
import AppHeader from "./components/Header";
import Books from "./components/books/Books";
import Cart from "./components/cart/Cart";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
            <AppHeader />
        </div>
        <div className="content">
          <Books className="Books" />
          <Cart />
        </div>
      </div>
    );
  }
}

export default App;
