import React, { Component } from 'react';
import logo from './images/logo4.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="logo-container">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default App;
