import React from "react";
import "./TaskHeader.css";

class TaskHeader extends React.Component {

    render() {
        return (
            <div className="task-header">
                <div className="left">
                    <img
                        src={require("../../images/list-icon.png")}
                        className="icon"
                        alt={this.props.task}
                    />

                    <h1> Groceries </h1>

                </div>

                <div className="right">
                    <input type="checkbox" name="select-all" className="select-all" />
                    <img
                        src={require("../../images/add-icon.png")}
                        className="icon"
                        alt={this.props.task}
                    />
                    <img
                        src={require("../../images/delete.png")}
                        className="icon"
                        alt={this.props.task}
                    />

                </div>

            </div>
        );
    }
}

export default TaskHeader;