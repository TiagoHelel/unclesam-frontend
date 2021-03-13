import React from "react";

import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ActivateUser from "./ActivateUser";

import Dashboard from "./Dashboard";
import CreateManagedUser from "./CreateManagedUser";
import Profile from "./Profile";
import Documents from "./Documents";
import UpdateManagedUser from "./UpdateManagedUser";
import Classifications from "./Classifications";
import CreateClassification from "./CreateClassification";
import UpdateClassification from "./UpdateClassification";

const Console: React.FC = () => (
  <Switch>
    <Route path="/console" exact component={SignIn} />
    <Route path="/console/forgot-password" component={ForgotPassword} />
    <Route path="/console/reset-password" component={ResetPassword} />
    <Route path="/console/activate-user" component={ActivateUser} />

    <Route path="/console/dashboard" component={Dashboard} isPrivate />
    <Route
      path="/console/criar-usuario"
      component={CreateManagedUser}
      isPrivate
    />
    <Route path="/console/profile" component={Profile} isPrivate />
    <Route path="/console/documentos" component={Documents} isPrivate />
    <Route path="/console/usuarios" component={UpdateManagedUser} isPrivate />
    <Route
      path="/console/classificacoes"
      component={Classifications}
      isPrivate
    />
    <Route
      path="/console/criar-classificacao"
      component={CreateClassification}
      isPrivate
    />
    <Route
      path="/console/classificacao"
      component={UpdateClassification}
      isPrivate
    />
  </Switch>
);

export default Console;
