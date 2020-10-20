import React from "react";
import "./NoTaskItem.css";
import TaskHeader from "../TaskHeader/TaskHeader";

class NoTaskItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	closeMenu = e => {
		if (e.target.className === "menu icon") {
			this.props.onMenuClick();
		} else {
			this.props.closeMenu();
		}
	};

	render() {
		return (
			<div className="no-task-item" onClick={this.closeMenu}>
				<div>
					<TaskHeader
						taskName={this.props.taskName}
						toggleAddNote={this.props.toggleAddNote}
						toggleDeleteTask={this.props.toggleDeleteTask}
						onMenuClick={this.props.onMenuClick}
						noNote={true}
					/>
				</div>

				<div className="content">
					<img src={require("../../images/question-class-note-symbol.svg")} className="logo" alt="logo" />
					<p> There is nothing here yet. </p>
				</div>
			</div>
		);
	}
}

export default NoTaskItem;
