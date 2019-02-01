import React from "react";
import "./TaskItem.css";

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false
        }
    }

    handleCheck = (e) => {
        this.props.handleItemCheck(e.target.checked);
    }

    showOverlay = () => {
        this.setState({
            showOverlay: true
        })
    }

    removeOverlay = () => {
        this.setState({
            showOverlay: false
        })
    }

    overlay = () => {
        return (
            <div className="buttons">
                <input
                    type="checkbox"
                    name="select-all"
                    checked={this.props.item.done}
                    onChange={this.props.handleItemCheck}
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
        );
    }

    render() {
        return (
            <div 
                className="task-item" 
                onMouseEnter={this.showOverlay}
                onMouseLeave={this.removeOverlay}
            >
                <p className={this.props.item.done ? "done" : ""}>
                    {this.props.item.note}
                </p>

                <span> Due Date: {this.props.item.dueDate} </span>

                {this.state.showOverlay ? <this.overlay /> : <div />}
            </div>
        );
    }
}

export default TaskItem;