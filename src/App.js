import React, { Component } from "react";
import Header from "./viewsOldVersion/Header";//TODO: update with new header
import AppRouter from "./helpers/Routing/routers/AppRouter";


class App extends Component {
  render() {
    return (
      <div>
        <Header height={"100"}/>
        <AppRouter />
      </div>
    );
  }
}

export default App;
