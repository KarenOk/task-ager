import React from "react";
import Navigator from "../Navigator/Navigator";
import TaskHeader from "../TaskHeader/TaskHeader";
import TaskItem from "../TaskItem/TaskItem";
import "./Main.css"

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            all: {
                title: "All",
                notes: [
                    {
                        note: "Go and find something that'll fill up your stomach so you'll be healthy",
                        dueDate: (new Date()).toLocaleString(),
                        done: false
                    }, {
                        note: "No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule. No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule.",
                        dueDate: (new Date()).toLocaleString(),
                        done: true
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="main">
                <Navigator />
                <div className="body">
                    <TaskHeader />
                    {this.state.all.notes.map((note, index) => {
                        return <TaskItem item={note} key={index} />
                    })}
                </div>
            </div>
        );
    }
}

export default Main;