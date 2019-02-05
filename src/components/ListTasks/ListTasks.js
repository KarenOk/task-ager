import React from "react";
import "./ListTasks.css"

class ListTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    startEdit = (e) => {
        e.preventDefault();
        this.setState({
            editing: true
        });
    }

    stopEdit = (e) => {
        if (e.keyCode && e.keyCode !== 13) return;

        this.setState({
            editing: false
        }, () => {
            // window.location.reload();
        });
    }

    render() {
        return (
            <div className="task">
                <img
                    src={require("../../images/list-icon.png")}
                    className="img"
                    alt={this.props.taskItem}
                />

                {
                    !this.state.editing ?
                        <h3> {this.props.taskItem} </h3> :
                        <input
                            className="edit-task"
                            value={this.props.taskItem}
                            autoFocus
                            onChange={this.props.handleEdit}
                            onKeyUp={this.stopEdit}
                            onBlur={this.stopEdit}
                        />
                }

                {
                    this.props.taskItem === "All" ?
                        <div style={{width: "30px"}}/> :
                        <img
                            src={require("../../images/edit.png")}
                            className="img"
                            onClick={this.startEdit}
                            alt={"Edit" + this.props.taskItem}

                        />
                }

            </div>
        );
    }
}

export default ListTasks;