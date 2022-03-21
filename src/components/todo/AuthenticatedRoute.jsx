import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationService.isLoggedIn()) {
      return { ...this.props.children };
    }
    return <Navigate to="/login" />;
  }
}

export default AuthenticatedRoute;
