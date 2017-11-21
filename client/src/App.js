import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/Header';
import Carrousel from './components/Carrousel';


class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
=======
          <div className = "App-Site">
            <div className = "App-Header">
                <AppHeader />
            </div>
            <div className = "Main">
              <Carrousel />
            </div>
          </div>


      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
>>>>>>> origin/dev_felipe
    );
  }
}

export default App;
