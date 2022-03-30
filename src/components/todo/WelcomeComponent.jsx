import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import HelloWorldService from "../api/todo-api/HelloWorldService";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: "",
      errorMessage: "",
      hasError: false,
    };

    this.retriveMessage = this.retriveMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Container>
          Welcome, {this.props.params.name}! You can manage your todo list{" "}
          <Link to="/todos">here</Link>!
        </Container>
        <Container>
          Please click the button to get the customised welcome message! <br />
          <button className="btn btn-success" onClick={this.retriveMessage}>
            Get Welcome Message
          </button>
        </Container>
        {!this.state.hasError && (
          <Container>{this.state.welcomeMessage}</Container>
        )}
        {this.state.hasError && (
          <div className="alert alert-warning">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }

  retriveMessage() {
    // HelloWorldService.executeHelloWorldService().then((response) =>
    //   this.handleSuccessfulResponse(response)
    // );

    // HelloWorldService.executeHelloWorldBeanService().then((response) =>
    //   this.handleSuccessfulResponse(response)
    // );

    HelloWorldService.executeHelloWorldPathVariableService(
      this.props.params.name
    )
      .then((response) => this.handleSuccessfulResponse(response))
      .catch((error) => this.handleErrorResponse(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({ welcomeMessage: response.data.message, hasError: false });
  }

  handleErrorResponse(error) {
    console.log(error.response);
    let errorMsg = '';
    if (error.message) {
      errorMsg += error.message;
    }
    if (error.response && error.response.data) {
      errorMsg += error.response.data.message;
    }
    this.setState({
      errorMessage: errorMsg,
      hasError: true,
    });
  }
}

export default WelcomeComponent;
