import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import TaskHeader from "../TaskHeader/TaskHeader";
import TaskItem from "../TaskItem/TaskItem";
import "./Main.css"

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            school: {
                title: "School",
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
            },
            groceries: {
                title: "Groceries",
                notes: [
                    {
                        note: "Nfjgbnmd,fm jjgjgjkr, stuff you know. If you want to be cool follow one simple rule. No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule.",
                        dueDate: (new Date()).toLocaleString(),
                        done: true
                    }, {
                        note: "Go and find something that'll fill up your stomach so you'll be healthy",
                        dueDate: (new Date()).toLocaleString(),
                        done: false
                    }
                ]
            }
        }
    }

    handleItemCheck = (index, task, e) => {
        const copy = { ...this.state[task] }; // Spread original object into new object
        copy.notes[index].done = e.target.checked;
        this.setState({
            [task]: copy // Set dynamic object key
        });
    }

    handleCheckAll = (e) => {
        Object.keys(this.state).forEach(task => {
            const copy = { ...this.state[task] }; // Spread original object into new object
            copy.notes.forEach(note => {
                note.done = e.target.checked;
            });
            this.setState({
                [task]: copy
            });
        })

    }

    renderAll = () => {
        let key = 0;
        return (
            <div className="body">
                <TaskHeader handleCheckAll={this.handleCheckAll} taskName={"All Tasks"} />
                {/* This approach to list all the tasks is funny. Couldnt get forEach and map to work together. */}
                {
                    Object.keys(this.state).map((task) => {

                        return (
                            this.state[task].notes.map((note, index) => {
                                key++;
                                return (
                                    <TaskItem
                                        item={note}
                                        key={key}
                                        handleItemCheck={this.handleItemCheck.bind(this, index, task)}
                                    />
                                );
                            })
                        );

                    })
                }

            </div>
        );
    }

    renderTask = (props) => {
        let task = props.match.params.taskName;
        if (!this.state[task]) return <div/>;
        return (
            <div className="body">
                <TaskHeader handleCheckAll={this.handleCheckAll} taskName={this.state[task].title} />

                {this.state[task].notes.map((note, index) => {
                    return (
                        <TaskItem
                            item={note}
                            key={index}
                            handleItemCheck={this.handleItemCheck.bind(this, index)}
                        />
                    );
                })}

            </div>
        );
    }

    render() {
        return (
            <div className="main">
                <Navigator />

                <Switch>
                    <Route exact path="/" component={this.renderAll} />
                    <Route exact path="/tasks" component={this.renderAll} />
                    <Route exact path="/tasks/all" component={this.renderAll} />
                    <Route path="/tasks/:taskName" render={props => <this.renderTask {...props} />} />
                </Switch>

            </div>
        );
    }
}

export default Main;