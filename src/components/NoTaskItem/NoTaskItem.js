import React from "react";
import "./NoTaskItem.css";

class NoTaskItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="no-task-item">
                <img
                    src={require("../../images/question-class-note-symbol.svg")}
                    className="logo"
                    alt="logo"
                />
                <p> There is nothing here yet. </p>
                <button
                    onClick={this.props.toggleAddNote}>
                    Add New Note
                </button>
            </div>
        );
    }
}

export default NoTaskItem;