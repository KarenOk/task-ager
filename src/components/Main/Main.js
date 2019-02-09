import React from "react";
import { Switch, Route } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Nav from "../Nav/Nav";
import TaskHeader from "../TaskHeader/TaskHeader";
import TaskItem from "../TaskItem/TaskItem";
import AddTaskItem from "../AddTaskItem/AddTaskItem";
import DeleteTask from "../DeleteTask/DeleteTask";
import storage from "../../services/storage";
import "./Main.css"

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: {},
            addNewNote: false,
            deleteTask: false,
            showMenu: false,
            currentTask: ""
        }
    }

    componentWillMount() {
        this.setState({ tasks: storage.getTasks() });
    }

    updateLocalStorage() {
        storage.setTasks(this.state.tasks);
    }

    handleDeleteItem = (index, task) => {
        const copy = { ...this.state.tasks[task] }; // Spread original object into new object
        copy.notes.splice(index, 1);
        const newTasks = {
            ...this.state.tasks,
            [task]: copy
        }

        this.setState({
            tasks: newTasks
        }, () => {
            this.updateLocalStorage()
        });
    }

    handleEditItem = (index, task, newNote) => {
        const copy = { ...this.state.tasks[task] };
        copy.notes[index].note = newNote;
        const newTasks = {
            ...this.state.tasks,
            [task]: copy
        }

        this.setState({
            tasks: newTasks
        }, () => {
            this.updateLocalStorage()
        });
    }

    handleItemCheck = (index, task, check) => {
        const copy = { ...this.state.tasks[task] };
        copy.notes[index].done = check;
        const newTasks = {
            ...this.state.tasks,
            [task]: copy
        }

        this.setState({
            tasks: newTasks
        }, () => {
            this.updateLocalStorage()
        });
    }


    onItemDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const taskCopy = { ...this.state.tasks[source.droppableId] };
        const removed = taskCopy.notes.splice(source.index, 1);
        taskCopy.notes.splice(destination.index, 0, removed[0]);
        const newTasks = {
            ...this.state.tasks,
            [source.droppableId]: taskCopy
        }

        this.setState({
            tasks: newTasks
        }, () => {
            this.updateLocalStorage()
        });
    }

    handleCheckAll = (e) => {
        Object.keys(this.state.tasks).forEach(task => {
            const copy = { ...this.state.tasks[task] };

            copy.notes.forEach(note => {
                note.done = e.target.checked;
            });
            const newTasks = {
                ...this.state.tasks,
                [task]: copy
            };

            this.setState(
                { tasks: newTasks },
                () => {
                    this.updateLocalStorage()
                }
            );
        })

    }

    handleAddNewNote = (obj, task) => {

        const copy = { ...this.state.tasks[task] };
        let id = copy.notes.length + 1;
        const newNote = {
            id: id,
            note: obj.note,
            dueDate: `${obj.dueDate}`,
            done: false
        };

        copy.notes.push(newNote);
        const newTasks = {
            ...this.state.tasks,
            [task]: copy
        }

        this.setState({
            tasks: newTasks
        }, () => {
            this.updateLocalStorage()
        });

    }

    handleDeleteTask = (taskName) => {
        this.refs.nav.handleDeleteTaskName();
        taskName = taskName.toLowerCase();

        let newTasks = Object.keys(this.state.tasks)
            .filter(key => key !== taskName)
            .reduce((result, current) => {
                result[current] = this.state.tasks[current];
                return result;
            }, {});

        this.setState({
            tasks: newTasks
        }, () => {
            this.updateLocalStorage();
            window.location.href = "/";
        });

    }

    toggleAddNewNote = () => {
        this.setState({ addNewNote: !this.state.addNewNote });
    }

    toggleDeleteTask = () => {
        this.setState({ deleteTask: !this.state.deleteTask });
    }

    openMenu = () => {
        this.setState({ showMenu: true });
    }

    closeMenu = () => {
        this.setState({ showMenu: false });
    }

    getCurrentTask = (taskName) => {
        if (this.state.currentTask === taskName) return;

        this.setState({ currentTask: taskName });
    }


    renderAll = () => {
        let key = 0;

        return (
            <main className="body">
                <TaskHeader handleCheckAll={this.handleCheckAll} taskName={"All Tasks"} />

                {/* This approach to list all the tasks is funny. Couldnt get forEach and map to work together. */}
                {
                    Object.keys(this.state.tasks).map((task) => {

                        return (
                            this.state.tasks[task].notes.map((note, index) => {
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

            </main>
        );
    }

    renderTask = (props) => {
        let task = props.match.params.taskName;
        if (!this.state.tasks[task]) return <div />;

        return (
            <main className="body">
                <TaskHeader
                    taskName={this.state.tasks[task].title}
                    handleCheckAll={this.handleCheckAll}
                    toggleAddNote={this.toggleAddNewNote}
                    toggleDeleteTask={this.toggleDeleteTask}
                    onMenuClick={this.openMenu}
                />

                <Droppable droppableId={task}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="container"
                            onClick={this.closeMenu}
                        >
                            {this.state.tasks[task].notes.map((note, index) => {
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

                {this.state.addNewNote ?
                    <AddTaskItem
                        taskName={task}
                        toggleAddNote={this.toggleAddNewNote}
                        addNewNote={this.handleAddNewNote}
                    /> : <span />
                }

                {this.state.deleteTask ?
                    <DeleteTask
                        taskName={task}
                        toggleDeleteTask={this.toggleDeleteTask}
                        handleDeleteTask={this.handleDeleteTask}
                    /> :
                    <span />
                }

            </main>
        );
    }

    render() {
        return (
            <div className="main">
                <Nav
                    ref="nav"
                    currentTask={this.state.currentTask}
                    getCurrentTask={this.getCurrentTask}
                    showMenu={this.state.showMenu ? "show" : ""} P
                    closeMenu={this.closeMenu}
                />

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