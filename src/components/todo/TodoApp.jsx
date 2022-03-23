import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import withNavigation from "./WithNavigation";
import withParams from "./WithParams";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import ListTodosComponent from "./ListTodosComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./Footer";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);
    const TodoComponentWithParamsAndNavigation = withParams(
      withNavigation(TodoComponent)
    );

    return (
      <div>
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/welcome/:name"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponentWithParams />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComponentWithParamsAndNavigation />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosComponentWithNavigation />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default TodoApp;
