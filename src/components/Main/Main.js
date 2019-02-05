import React from "react";
import { Switch, Route } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Nav from "../Nav/Nav";
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
                        id: 1,
                        note: "Go and find something that'll fill up your stomach so you'll be healthy",
                        dueDate: (new Date()).toLocaleString(),
                        done: false
                    }, {
                        id: 2,
                        note: "No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule. No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule.",
                        dueDate: (new Date()).toLocaleString(),
                        done: true
                    }, {
                        id: 3,
                        note: "Yes yes yes yes yes yes yes yes, stict to the stuff you know. If you want to be cool follow one simple rule. No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule.",
                        dueDate: (new Date()).toLocaleString(),
                        done: true
                    }

                ]
            },
            groceries: {
                title: "Groceries",
                notes: [
                    {
                        id: 1,
                        note: "Nfjgbnmd,fm jjgjgjkr, stuff you know. If you want to be cool follow one simple rule. No no no no no no no no, stict to the stuff you know. If you want to be cool follow one simple rule.",
                        dueDate: (new Date()).toLocaleString(),
                        done: true
                    }, {
                        id: 2,
                        note: "Go and find something that'll fill up your stomach so you'll be healthy",
                        dueDate: (new Date()).toLocaleString(),
                        done: false
                    }
                ]
            }
        }
    }


    handleDeleteItem = (index, task) => {
        const copy = { ...this.state[task] }; // Spread original object into new object
        copy.notes.splice(index, 1);

        this.setState({
            [task]: copy // Set dynamic object key
        });
    }

    handleEditItem = (index, task, newNote) => {
        const copy = { ...this.state[task] };
        copy.notes[index].note = newNote;

        this.setState({
            [task]: copy
        });
    }

    handleItemCheck = (index, task, check) => {
        const copy = { ...this.state[task] };
        copy.notes[index].done = check;

        this.setState({
            [task]: copy
        });
    }

    handleCheckAll = (e) => {
        Object.keys(this.state).forEach(task => {
            const copy = { ...this.state[task] };

            copy.notes.forEach(note => {
                note.done = e.target.checked;
            });

            this.setState({
                [task]: copy
            });
        })

    }

    onItemDragEnd = (result) => {
        const { source, destination} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const taskCopy = { ...this.state[source.droppableId] };
        const removed = taskCopy.notes.splice(source.index, 1);
        taskCopy.notes.splice(destination.index, 0, removed[0]);
        const newState = {
            ...this.state,
            [source.droppableId]: taskCopy
        }

        this.setState(newState);
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
                                        handleDeleteItem={this.handleDeleteItem.bind(this, index, task)}
                                        handleEditItem={this.handleEditItem.bind(this, index, task)}
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
        if (!this.state[task]) return <div />;

        return (
            <div className="body">
                <TaskHeader handleCheckAll={this.handleCheckAll} taskName={this.state[task].title} />

                <Droppable droppableId={task}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.state[task].notes.map((note, index) => {
                                return (
                                    <TaskItem
                                        item={note}
                                        key={index}
                                        index={index}
                                        draggableId={`${task}-${index}`}
                                        handleItemCheck={this.handleItemCheck.bind(this, index, task)}
                                        handleDeleteItem={this.handleDeleteItem.bind(this, index, task)}
                                        handleEditItem={this.handleEditItem.bind(this, index, task)}
                                    />
                                );
                            })}
                            {/* {...provided.placeholder} */}
                        </div>
                    )}

                </Droppable>

            </div>
        );
    }

    render() {
        return (
            <div className="main">
                <Nav />

                <DragDropContext onDragEnd={this.onItemDragEnd}>
                    <Switch>
                        <Route exact path="/tasks" component={this.renderAll} />
                        <Route exact path="/tasks/all" component={this.renderAll} />
                        <Route path="/tasks/:taskName" render={props => <this.renderTask {...props} />} />
                    </Switch>
                </DragDropContext>


            </div>
        );
    }
}

export default Main;