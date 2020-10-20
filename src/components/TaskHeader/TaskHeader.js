import React from "react";
import { capitalize, unlinkify } from "../../services/utils.js";
import "./TaskHeader.css";

class TaskHeader extends React.Component {
	render() {
		return (
			<div className="task-header">
				<div className="left">
					<img src={require("../../images/list-icon.png")} className="list icon" alt={this.props.task} />

					<img
						src={require("../../images/menu-icon.svg")}
						className="menu icon"
						alt="Menu"
						onClick={this.props.onMenuClick}
					/>

					<h1> {capitalize(unlinkify(this.props.taskName))} </h1>
				</div>

				<div className="right">
					<input
						type="checkbox"
						name="select-all"
						className="select-all"
						hidden={this.props.noNote}
						title="Check All"
						onChange={this.props.handleCheckAll}
					/>
					<img
						src={require("../../images/add-icon.png")}
						title="Add Note"
						className="icon"
						alt={"Add note to" + this.props.task}
						onClick={this.props.toggleAddNote}
					/>
					<img
						src={require("../../images/delete.png")}
						title="Delete Task"
						className="icon"
						alt={"Delete" + this.props.task}
						onClick={this.props.toggleDeleteTask}
					/>
				</div>
			</div>
		);
	}
}

export default TaskHeader;
