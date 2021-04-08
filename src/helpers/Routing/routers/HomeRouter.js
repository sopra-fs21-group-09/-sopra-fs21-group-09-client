import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "/src/components/home/Home";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class HomeRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/dashboard`}
          render={() => <Home base={"/home"}/>}
        />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/dashboard`}/>}/>

      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default HomeRouter;