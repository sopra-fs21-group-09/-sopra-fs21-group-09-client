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
                    <HomeRouter  base={"/home"}/>
                  </HomeGuard>
              )}
            />
            <Route
              path="/profile"
              render={() => (
                  <Profile />
              )}
            />
            <Route
              path="/edit"
              render={() => (
                  <Edit />
              )}
            />
              <Route
                  path="/module"
                  render={() => (
                      <Module />
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
