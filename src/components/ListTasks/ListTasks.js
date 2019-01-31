import React from "react";
import "./ListTasks.css"

class ListTasks extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="task-item">
                <img
                    src={require("../../images/logo2.png")}
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