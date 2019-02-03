import React from "react";
import { NavLink } from "react-router-dom";
import ListTasks from "../ListTasks/ListTasks";
import "./Navigator.css";

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ["All", "Groceries", "School", "Work", "Make money"],
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

    linkify = (taskName) => {
        return taskName.split(" ").map(item => item.toLowerCase()).join("-");
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

                <nav>
                    {
                        this.state.tasks.map((task, index) => {
                            return (
                                <NavLink
                                    exact
                                    to={"/tasks/" + this.linkify(task)}
                                    key={index}
                                    activeClassName="active"
                                    style={{ textDecoration: "none" }}
                                >
                                    <ListTasks taskItem={task} />
                                </NavLink>
                            );
                        })
                    }
                </nav>

            </div>
        );
    }
}

export default Navigator;