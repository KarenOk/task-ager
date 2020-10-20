import React from "react";
import "./ListTasks.css";

class ListTasks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			taskName: this.props.taskName
		};
	}

	startEdit = e => {
		e.preventDefault();
		this.setState({
			editing: true
		});
	};

	stopEdit = e => {
		if (e.keyCode && e.keyCode !== 13) return;

		this.setState({
			editing: false
		});

		if (this.state.taskName) {
			this.props.handleEdit(this.state.taskName);
		} else {
			this.setState({
				taskName: this.props.taskName
			});
		}
	};

	handleChange = e => {
		if (RegExp(/^[a-zA-Z0-9 ]*$/).test(e.target.value)) {
			this.setState({
				taskName: e.target.value
			});
		}
	};

	render() {
		return (
			<div className="task">
				<img src={require("../../images/list-icon.png")} className="img" alt={this.props.taskName} />

				{!this.state.editing ? (
					<h3> {this.props.taskName} </h3>
				) : (
					<input
						autoFocus
						required
						className="edit-task"
						value={this.state.taskName}
						type="text"
						maxLength="20"
						onChange={this.handleChange}
						onKeyUp={this.stopEdit}
						onBlur={() => this.stopEdit({})}
					/>
				)}

				{this.props.taskName === "All" ? (
					<div style={{ width: "30px" }} />
				) : (
					<img
						src={require("../../images/edit.png")}
						className="img"
						onClick={this.startEdit}
						alt={"Edit" + this.props.taskName}
					/>
				)}
			</div>
		);
	}
}

export default ListTasks;
