import React from "react";
import "./DeleteTask.css";

class DeleteTask extends React.Component {

    handleDeleteTask = () => {
        this.props.handleDeleteTask(this.props.taskName);
    }

    render() {
        return (
            <div className="delete-task modal-overlay">
                <div className="modal">
                    <header>
                        <img
                            src={require("../../images/close.png")}
                            className="close-icon"
                            alt="Close"
                            align="right"
                            onClick={this.props.toggleDeleteTask}
                        />
                        <h1> Confirmation </h1>
                    </header>
                    <p>
                        Delete task "<span className="task-name">{this.props.taskName}</span>" and all of its content?
                    </p>
                    <div className="buttons">
                        <button className="no" onClick={this.props.toggleDeleteTask}> No </button>
                        <button className="yes" onClick={this.handleDeleteTask}> Yes </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteTask;