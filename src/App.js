import React from "react";
import logo from "./images/logo4.svg";
import Home from "./components/Home/Home"
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    }

  }

  handleHomeMount = (ready) => {
    setTimeout(() => {
      this.setState({
        ready: true
      });
    }, 1000);
  }

  homePage = () => {
    return (
      <div className="home-container">
        <Home handleMount={this.handleHomeMount} />
      </div>
    );
  }

  welcomePage = () => {
    return (
        <div className="welcome-page">
          <img
            src={logo}
            className="logo"
            alt="logo"
            onAnimationEnd={this.handleHomeMount}
          />
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        {this.state.ready ? <this.homePage /> : <this.welcomePage />}
      </div>
    );
  }
}

export default App;
