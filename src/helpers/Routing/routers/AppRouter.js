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
import {Modules} from "../../../components/module/Modules";
import {JoinModules} from "../../../components/module/JoinModules"
import {ModuleDetail} from "../../../components/module/ModuleDetail";
import {MyGroups} from "../../../components/group/myGroups"
import JoinAppGroup from "../../../components/GroupProcess/JoinAppGroup";
import CreateGroup from "../../../components/GroupProcess/CreateGroup";
import GroupLogin from "../../../components/group/GroupLogin";
import Home from "../../../components/home/HomeHook";
import JoinModuleGroup from "../../../components/GroupProcess/JoinModuleGroup";
import {Tasks} from "../../../components/task/Tasks";

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
              path="/modules"
              render={() => (
                  <HomeGuard>
                    <Modules />
                  </HomeGuard>
              )}
            />
            <Route
              path="/joinModules"
              render={() => (
                  <HomeGuard>
                    <JoinModules/>
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
              path="/myGroups"
              render={() => (
                  <HomeGuard>
                    <MyGroups/>
                  </HomeGuard>
              )}
            />
            <Route
              path="/joinModuleGroup"
              render={() => (
                  <HomeGuard>
                      <JoinModuleGroup />
                  </HomeGuard>
              )}
            />
            <Route
              path="/joinAppGroup"
              render={() => (
                  <HomeGuard>
                    <JoinAppGroup />
                  </HomeGuard>
              )}
            />
              <Route
                  path="/tasks"
                  render={() => (
                      <HomeGuard>
                          <Tasks/>
                      </HomeGuard>
                  )}
              />
            <Route
              path="/createGroup"
              render={() => (
                  <HomeGuard>
                      <CreateGroup />
                  </HomeGuard>
              )}
            />
            <Route
              path="/groupLogin"
              render={() => (
                  <HomeGuard>
                      <GroupLogin />
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
