import React from "react";
import ListTasks from "../ListTasks/ListTasks";
import "./Navigator.css";

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ["All", "Groceries", "School", "Work"],
            newTask: ""
        }
    }

    handleNewTask = (e) => {
        this.setState({
            newTask: e.target.value
        });
    }

    handleSaveTask = (e) => {
        if (e.keyCode !== 13 || !this.state.newTask) return;

        this.state.tasks.splice(1, 0, this.capitalize(this.state.newTask));
        this.setState({
            newTask: ""
        });
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <div className="navigator">
                <img
                    src={require("../../images/logo4.svg")}
                    className="logo"
                    alt="logo"
                />

                <div className="add-task">
                    <input
                        name="new-task"
                        placeholder="New Task"
                        onKeyUp={this.handleSaveTask}
                        onChange={this.handleNewTask}
                        value={this.state.newTask}
                    />
                </div>

                {this.state.tasks.map((task, index) => {
                    return <ListTasks taskItem={task} key={index} />
                })}

            </div>
        );
    }
}

export default Navigator;