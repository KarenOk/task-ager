import React from "react";
import "./ListTasks.css"

class ListTasks extends React.Component {
    render() {
        return (
            <div className="task">
                <img
                    src={require("../../images/list-icon.png")}
                    className="img"
                    alt={this.props.taskItem}
                />

                <h3> {this.props.taskItem} </h3>

                <img
                    src={require("../../images/edit.png")}
                    className="img"
                    alt={this.props.taskItem}
                />

            </div>
        );
    }
}

export default ListTasks;