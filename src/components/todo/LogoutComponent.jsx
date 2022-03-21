import React, { Component } from "react";
import { Container } from "react-bootstrap";

class LogoutComponent extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out</h1>
        <Container>Thank you for using our application!</Container>
      </div>
    );
  }
}

export default LogoutComponent;
