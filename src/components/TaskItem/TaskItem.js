import React from "react";
import "./TaskItem.css";

class TaskItem extends React.Component {
    render() {
        return (
            <div className="task-item">
                <p
                    className={this.props.item.done ? "done" : ""}
                >
                    {this.props.item.note}
                </p>

                <div className="extras">
                    <div className="buttons">
                        <input
                            type="checkbox"
                            name="select-all"
                            checked={this.props.item.done}
                            className="select-all"
                        />
                        <img
                            src={require("../../images/edit.png")}
                            className="icon"
                            alt="Edit"
                        />
                        <img
                            src={require("../../images/delete.png")}
                            className="icon"
                            alt="Delete"
                        />
                        <img
                            src={require("../../images/move-icon.png")}
                            className="icon"
                            alt="Move"
                        />
                    </div>
                    <span> Due Date: {this.props.item.dueDate} </span>
                </div>
            </div>
        );
    }
}

export default TaskItem;