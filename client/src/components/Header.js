import React, { Component } from 'react';
import '../App.css';

class AppHeader extends Component {
  render() {
    return (
          <div className = "container">
              <div className = "row">
                  <div className ="col-md-12 text-center App-header">
                      Welcome to GeekBook
                  </div>
              </div>
          </div>
    );
  }
}

export default AppHeader;
