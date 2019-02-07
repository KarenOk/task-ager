import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./AddTaskItem.css";

class AddTaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            dueDate: undefined,
            counter: 150,
            submitDisabled: true
        }
    }

    enableSubmit = () => {
        if (this.state.note && this.state.dueDate) {
            this.setState({
                submitDisabled: false
            });
        } else {
            this.setState({
                submitDisabled: true
            });
        }
    }

    handleNoteChange = (e) => {
        let count = 150 - e.target.value.length;
        this.setState({
            note: e.target.value,
            counter: count
        }, () => {
            this.enableSubmit();
        });

    }

    handleDateChange = (date) => {
        this.setState({
            dueDate: date
        }, () => {
            this.enableSubmit();
        });
    }

    addNewNote = () => {
        this.props.toggleAddNote();
        this.props.addNewNote({
            note: this.state.note,
            dueDate: this.state.dueDate
        }, this.props.taskName);
    }

    render() {
        return (
            <div className="add-task-item modal-overlay">
                <div className="modal">
                    <header>
                        <img
                            src={require("../../images/close.png")}
                            className="close-icon"
                            alt="Close"
                            align="right"
                            onClick={this.props.toggleAddNote}
                        />
                        <h1> New Note </h1>
                    </header>

                    <main>
                        <div className="note">
                            <span
                                className={"word-count " + (this.state.counter <= 10 ? "warning" : "")}
                                align="right">
                                {this.state.counter}
                            </span>
                            <label htmlFor="new-note"> Enter note: </label>
                            <textarea
                                rows="4"
                                id="new-note"
                                type="text"
                                maxLength="150"
                                value={this.state.note}
                                placeholder="Enter new note"
                                onChange={this.handleNoteChange}
                            ></textarea>
                        </div>

                        <div className="due-date">
                            <label htmlFor="date-time"> Due Date? </label>
                            <DatePicker
                                selected={this.state.dueDate}
                                onChange={this.handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy hh:mm aa"
                                timeCaption="Time"
                                className="datetime-picker"
                                id="date-time"
                            />
                        </div>

                        <button onClick={this.addNewNote} disabled={this.state.submitDisabled}>
                            Add note to {this.props.taskName}
                        </button>
                    </main>
                </div>
            </div>
        );
    }
}

export default AddTaskItem;