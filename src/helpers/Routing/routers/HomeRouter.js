import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "../../../components/home/Home";
import Profile from "../../../components/profile/Profile";
import Edit from "../../../components/profile/Edit";
import Module from "../../../components/module/Module";
import JoinModule from "../../../components/module/JoinModule";
import ModuleDetail from "../../../components/module/ModuleDetail";
import JoinGroup from "../../../components/GroupProcess/JoinGroup";
import {HomeGuard} from "../routeProtectors/HomeGuard";

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
          path={`${this.props.base}`}
          render={() =>
              <HomeGuard>
              <Home base={"/home"}/>
              </HomeGuard>}
        />

          {/*<Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/dashboard`}/>}
        />*/}

        <Route
          exact
          path={`${this.props.base}/profile`}
          render={() =>
              <HomeGuard>
                  <Profile/>
              </HomeGuard>}
        />

        <Route
          exact
          path={`${this.props.base}/edit`}
          render={() =>
              <HomeGuard>
                  <Edit/>
              </HomeGuard>}

        />

        <Route
          exact
          path={`${this.props.base}/module`}
          render={() =>
              <HomeGuard>
                  <Module/>
              </HomeGuard>}

        />

        <Route
          exact
          path={`${this.props.base}/joinModule`}
          render={() =>
              <HomeGuard>
                  <JoinModule/>
              </HomeGuard>}

        />

        <Route
          exact
          path={`${this.props.base}/moduleDetail`}
          render={() =>
              <HomeGuard>
                  <ModuleDetail/>
              </HomeGuard>}

        />

        <Route
          exact
          path={`${this.props.base}/joinGroup`}
          render={() =>
              <HomeGuard>
                  <JoinGroup/>
              </HomeGuard>}

        />

      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default HomeRouter;
