import * as React from "react";
import { Route } from "react-router-dom";
import Main from "./main/Main";
import Login from "./login/LoginPage";
import Dashboard from "./dashboard/Dashboard";

const App = () => (
  <div>
    <Route path="/" component={Main} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/dashboard" component={Dashboard} exact />
  </div>
);

export default App;
