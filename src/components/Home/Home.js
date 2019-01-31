import React from "react";
import Navigator from "../Navigator/Navigator";
import "./Home.css"

class App extends React.Component {

    render() {
        return (
            <div className="home">
                <Navigator />
            </div>
        );
    }
}

export default App;