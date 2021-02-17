import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Home";

import SignUp from "./SignUp";

const Console: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/cadastro" component={SignUp} />
  </Switch>
);

export default Console;
