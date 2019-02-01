import React from "react";
import { Switch, Route } from "react-router-dom";
import logo from "./images/logo4.svg";
import Main from "./components/Main/Main";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    }

  }

  handleMainMount = () => {
    setTimeout(() => {
      this.setState({
        ready: true
      });
    }, 1000);
  }

  mainPage = () => {
    return (
      <div className="main-page">
        <Main handleMount={this.handleMainMount} />
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
          onAnimationEnd={this.handleMainMount}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={props => (
            this.state.ready ? <this.mainPage /> : <this.welcomePage />
          )} />
          <Route path="/tasks" component={this.mainPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
