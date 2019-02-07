import React from "react";
import { NavLink } from "react-router-dom";
import ListTasks from "../ListTasks/ListTasks";
import "./Nav.css";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ["All", "Groceries", "School", "Work", "Make Money"],
            newTask: ""
        }
    }

    checkActive = (match, location) => {
        if (!match) return false;

        if (match.url === location.pathname) {
            let taskName = this.capitalize(this.unlinkify(match.url));
            this.props.getCurrentTask(taskName);
            return true;
        }
    } 
    
    handleNewTask = (e) => {
        this.setState({
            newTask: e.target.value
        });
    }
    
    handleEditTask = (index, e) => {
        const copy = [...this.state.tasks];
        copy[index] = e.target.value;
        
        this.setState({
            tasks: copy
        });
    }
    
    handleDeleteTask = () => {       
        const currentTask = this.props.currentTask;
        const index = this.state.tasks.findIndex(task => task === currentTask);
        const newTasks = [...this.state.tasks];
        newTasks.splice(index, 1);

        this.setState({
            tasks: newTasks
        });

    }

    handleSaveTask = (e) => {
        if (e.keyCode !== 13 || !this.state.newTask) return;

        this.state.tasks.splice(1, 0, this.capitalize(this.state.newTask));
        this.setState({
            newTask: ""
        });
    }

    capitalize = (string) => {
        let newString = "";
        string.split(" ").forEach(word => {
            newString += (word.charAt(0).toUpperCase() + word.slice(1) + " ");
        });

        return newString.trim();
    }

    linkify = (taskName) => {
        return taskName.split(" ").map(item => item.toLowerCase()).join("-");
    }

    unlinkify = (taskName) => {
        let splitLink = taskName.split("/");
        return splitLink[splitLink.length - 1].split("-").map(item => item.toLowerCase()).join(" ");
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
                        type="text"
                        maxLength="20"
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
                                    isActive={this.checkActive}
                                    style={{ textDecoration: "none" }}
                                >
                                    <ListTasks taskItem={task} handleEdit={this.handleEditTask.bind(this, index)} />
                                </NavLink>
                            );
                        })
                    }
                </nav>

            </div>
        );
    }
}

export default Nav;