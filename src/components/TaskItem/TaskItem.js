import React from "react";
import "./TaskItem.css";

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    startEdit = () => {
        this.setState({
            editing: true
        });
    }

    stopEdit = (e) => {
        if (e.keyCode && e.keyCode !== 13) return;

        this.setState({
            editing: false
        })
    }

    handleCheck = (e) => {
        this.props.handleItemCheck(e.target.checked);
    }

    handleDelete = (e) => {
        this.props.handleDeleteItem();
    }

    handleEdit = (e) => {
        this.props.handleEditItem(e.target.value);
    }

    overlay = () => {
        return (
            <div className={`buttons ${this.state.editing ? "hidden" : ""}`}>
                <input
                    type="checkbox"
                    name="select-all"
                    checked={this.props.item.done}
                    onChange={this.handleCheck}
                    className="select-all"
                />
                <img
                    src={require("../../images/edit.png")}
                    className="icon"
                    alt="Edit"
                    onClick={this.startEdit}
                />
                <img
                    src={require("../../images/delete.png")}
                    className="icon"
                    alt="Delete"
                    onClick={this.handleDelete}
                />
                <img
                    src={require("../../images/move-icon.png")}
                    className="icon"
                    alt="Move"
                />
            </div>
        );
    }

    render() {
        return (
            <div
                className="task-item"
            >
                {
                    this.state.editing === false ?
                        <p className={this.props.item.done ? "done" : ""}>
                            {this.props.item.note}
                        </p>:
                        
                        <textarea
                            className="edit-area"
                            value={this.props.item.note}
                            onChange={this.handleEdit}
                            onBlur={this.stopEdit}
                            onKeyUp={this.stopEdit}
                        />
                }
                <span> Due Date: {this.props.item.dueDate} </span>
                
                <this.overlay />
            </div>
        );
    }
}

export default TaskItem;