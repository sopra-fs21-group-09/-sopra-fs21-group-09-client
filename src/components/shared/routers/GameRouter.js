import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Game from "../../game/Game";
import UserProfile from "../../game/UserProfile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/dashboard`}
          render={() => <Game base={"/game"}/>}
        />

        <Route
          exact
          path={`${this.props.base}/userProfile`}
          render={() => <UserProfile base = {"/game/userProfile"}/>}
        />

      <Route
          exact
          path={`${this.props.base}/userProfile/edit`}
          render={() => <UserProfile base = {"/game/userProfile"}/>} //TODO: change to UserProfileEdit
      />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/dashboard`} />}
        />

      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
