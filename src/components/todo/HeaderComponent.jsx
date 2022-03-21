import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isLoggedIn();
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/welcome/ying">Aria's</Navbar.Brand>
          {isUserLoggedIn && (
            <Navbar.Collapse>
              <Nav.Link className="navbar-link" href="/welcome/ying">
                Home
              </Nav.Link>
              <Nav.Link className="navbar-link" href="/todos">
                Todos
              </Nav.Link>
            </Navbar.Collapse>
          )}
          <Navbar.Collapse className="justify-content-end">
            {!isUserLoggedIn && (
              <Nav.Link className="navbar-link" href="/login">
                Login
              </Nav.Link>
            )}
            {isUserLoggedIn && (
              <Nav.Link
                className="navbar-link"
                href="/logout"
                onClick={AuthenticationService.logout}
              >
                Logout
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default HeaderComponent;
