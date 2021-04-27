import React, { Component } from "react";
import AppRouter from "./helpers/Routing/routers/AppRouter";

//Start the server with two terminals and the following two commands:
// ./gradlew build --continuous or ./gradlew build --continuous -xtest
// ./gradlew bootRun


class App extends Component {
  render() {
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
}

export default App;
