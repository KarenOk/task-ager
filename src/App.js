import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import logo from "./images/logo4.svg";
import Main from "./components/Main/Main";
import storage from "./services/storage";
import { ToastsContainer, ToastsStore } from "react-toasts";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false
		};
	}

	componentWillMount() {
		storage.init();
	}

	handleMainMount = () => {
		setTimeout(() => {
			this.setState({
				redirect: true
			});
		}, 1000);
	};

	welcomePage = () => {
		return (
			<div className="welcome-page">
				<img src={logo} className="logo" alt="logo" onAnimationEnd={this.handleMainMount} />
			</div>
		);
	};

	render() {
		return (
			<div className="app">
				<ToastsContainer store={ToastsStore} position="top_center" />
				<Switch>
					<Route exact path="/" component={this.welcomePage} />
					<Route path="/tasks" component={Main} />
					<Route render={() => <Redirect to="/" />} />
				</Switch>
				{this.state.redirect ? <Redirect to="/tasks/all" /> : <div />}
			</div>
		);
	}
}

export default App;
