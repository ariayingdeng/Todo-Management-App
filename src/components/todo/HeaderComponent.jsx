import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import AuthenticationService from "./AuthenticationService";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isLoggedIn();
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/welcome/ying">Aria's</Navbar.Brand>
          {isUserLoggedIn && (
            <Navbar.Collapse>
              <Link className="navbar-link" to="/welcome/ying">
                Home
              </Link>&nbsp;&nbsp;
              <Link className="navbar-link" to="/todos">
                Todos
              </Link>
            </Navbar.Collapse>
          )}
          <Navbar.Collapse className="justify-content-end">
            {!isUserLoggedIn && (
              <Link className="navbar-link" to="/login">
                Login
              </Link>
            )}
            {isUserLoggedIn && (
              <Link
                className="navbar-link"
                to="/logout"
                onClick={AuthenticationService.logout}
              >
                Logout
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default HeaderComponent;
