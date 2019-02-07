import React from "react";
import { Draggable } from "react-beautiful-dnd";
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

    overlay = (dragHandleProps) => {
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
                    src={require("../../images/move-icon.png")}
                    className="icon move"
                    alt="Move"
                    {...dragHandleProps}
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
                
            </div>
        );
    }

    render() {
        return (
            <Draggable
                draggableId={this.props.draggableId}
                index={this.props.index}
            >
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="task-item"

                    >
                        {
                            this.state.editing === false ?
                                <p className={this.props.item.done ? "done" : ""}>
                                    {this.props.item.note}
                                </p> :

                                <textarea
                                    className="edit-area"
                                    rows="4"
                                    autoFocus
                                    required
                                    type="text"
                                    maxLength="150"
                                    value={this.props.item.note}
                                    onChange={this.handleEdit}
                                    onBlur={this.stopEdit}
                                    onKeyUp={this.stopEdit}
                                />
                        }
                        <span> Due Date: {new Date(this.props.item.dueDate).toGMTString()} </span>

                        <this.overlay {...provided.dragHandleProps}/>

                    </div>
                )}

            </Draggable>
        );
    }
}

export default TaskItem;