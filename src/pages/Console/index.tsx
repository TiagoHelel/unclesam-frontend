import React from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "./SignIn";
// import ForgotPassword from "./ForgotPassword";
// import ResetPassword from "./ResetPassword";
// import ActivateUser from "./ActivateUser";

import Dashboard from "./Dashboard";
// import CreateManagedUser from "./CreateManagedUser";
// import Profile from "./Profile";
// import Documents from "./Documents";
// import UpdateManagedUser from "./UpdateManagedUser";
// import Classifications from "./Classifications";
// import CreateClassification from "./CreateClassification";
// import UpdateClassification from "./UpdateClassification";

const Console: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    {/* <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/activate-user" component={ActivateUser} /> */}

    <Route path="/dashboard" component={Dashboard} isPrivate />
    {/* <Route path="/criar-usuario" component={CreateManagedUser} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/documentos" component={Documents} isPrivate />
    <Route path="/usuarios" component={UpdateManagedUser} isPrivate />
    <Route path="/classificacoes" component={Classifications} isPrivate />
    <Route
      path="/criar-classificacao"
      component={CreateClassification}
      isPrivate
    />
    <Route path="/classificacao" component={UpdateClassification} isPrivate /> */}
  </Switch>
);

export default Console;
