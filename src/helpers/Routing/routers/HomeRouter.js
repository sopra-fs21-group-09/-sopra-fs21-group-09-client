import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "../../../components/home/Home";
import Profile from "../../../components/profile/Profile";
import Edit from "../../../components/profile/Edit";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class HomeRouter extends React.Component {
  render() {
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
          render={() => <Redirect to={`${this.props.base}/dashboard`}/>}
        />

        <Route
          exact
          path={`${this.props.base}/profile`}
          render={() => <Profile/>}
        />

        <Route
          exact
          path={`${this.props.base}/edit`}
          render={() => <Edit/>}
        />

      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default HomeRouter;
