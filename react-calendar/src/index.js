import React from "react";
import ReactDOM from "react-dom";

import Calendar from "./components/calendar";


class NewComponent extends React.Component {
  render() {
    return (
      <div>
        new component
      </div>
    );
  }
}

function App() {
  return (<div><Calendar />
  </div>);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
