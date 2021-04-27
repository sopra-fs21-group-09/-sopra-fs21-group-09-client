import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomeRouter from "./HomeRouter";
import {HomeGuard} from "../routeProtectors/HomeGuard";
import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Registration from "../../../components/authentication/Registration";
import Login from "../../../components/authentication/Login";
import Profile from "../../../components/profile/Profile";
import Edit from "../../../components/profile/Edit";
import Module from "../../../components/module/Module";
import JoinModule from "../../../components/module/JoinModule";
import ModuleDetail from "../../../components/module/ModuleDetail";
import {MyGroups} from  "../../../components/group/MyGroups"
import JoinGroup from "../../../components/GroupProcess/JoinGroup";
import Home from "../../../components/home/HomeHook";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/registration"
              render={() => (
                  <RegistrationGuard>
                      <Registration />
                  </RegistrationGuard>
              )}
            />
            <Route
              path="/login"
              render={() => (
                   <LoginGuard>
                       <Login />
                   </LoginGuard>
              )}
            />
            <Route
              path="/home"
              render={() => (
                  <HomeGuard>
                    <Home/>
                  </HomeGuard>
              )}
            />
            <Route
              path="/profile"
              render={() => (
                  <HomeGuard>
                  <Profile />
                  </HomeGuard>
              )}
            />
            <Route
              path="/edit"
              render={() => (
                  <HomeGuard>
                    <Edit />
                  </HomeGuard>
              )}
            />
            <Route
              path="/module"
              render={() => (
                  <HomeGuard>
                    <Module />
                  </HomeGuard>
              )}
            />
            <Route
              path="/joinModule"
              render={() => (
                  <HomeGuard>
                    <JoinModule />
                  </HomeGuard>
              )}
            />
            <Route
              path="/moduleDetail"
              render={() => (
                  <HomeGuard>
                    <ModuleDetail />
                  </HomeGuard>
              )}
            />
            <Route
              path="/MyGroups"
              render={() => (
                  <HomeGuard>
                    <MyGroups />
                  </HomeGuard>
              )}
            />
            <Route
              path="/joinGroup"
              render={() => (
                  <HomeGuard>
                    <JoinGroup />
                  </HomeGuard>
              )}
            />
            <Route path="/" exact render={() => <Redirect to={"/registration"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
