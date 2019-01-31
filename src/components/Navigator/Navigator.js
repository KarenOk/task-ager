import React from "react";
import ListTasks from "../ListTasks/ListTasks";
import "./Navigator.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ["All", "Groceries", "School", "Work"]
        }
    }

    render() {
        return (
            <div className="navigator">
                <img
                    src={require("../../images/logo4.svg")}
                    className="logo"
                    alt="logo"
                />

                {this.state.tasks.map(task => {
                    return <ListTasks taskItem={task} />
                })}

                <div className="add-task">
                    <img
                        src={require("../../images/add-icon.png")}
                        alt="New Task"
                    />
                    <h3> New Task </h3>
                </div>

            </div>
        );
    }
}

export default App;