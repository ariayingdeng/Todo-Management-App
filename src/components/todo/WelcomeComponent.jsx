import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class WelcomeComponent extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Container>
          Welcome, {this.props.params.name}! You can manage your todo list{" "}
          <Link to="/todos">here</Link>!
        </Container>
      </div>
    );
  }
}

export default WelcomeComponent;
