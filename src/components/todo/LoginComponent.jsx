import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import { Container } from "react-bootstrap";

class LoginComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "ying",
        password: "",
        showSuccessfulMsg: false,
        failValidation: false,
      };
      // this.handleUsernameChange = this.handleUsernameChange.bind(this);
      // this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.loginClicked = this.loginClicked.bind(this);
    }
  
    render() {
      return (
        <div>
          <h1>Login</h1>
          <br />
          <Container>
            {/* <ShowLoginMessage
                showLoginMessage={this.state.showSuccessfulMsg}
                failValidation={this.state.failValidation}
              /> */}
            {/* {this.state.showSuccessfulMsg && <div>Login Successfully</div>} */}
            {this.state.failValidation && (
              <div className="alert alert-warning">Invalid Credentials</div>
            )}
            Username:{" "}
            <input
              type={"text"}
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br />
            <br />
            Password:{" "}
            <input
              type={"password"}
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <button className="btn btn-success" onClick={this.loginClicked}>
              Login
            </button>
          </Container>
        </div>
      );
    }
  
    handleChange(event) {
      // console.log(event.target.name + ' ' + event.target.value);
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  
    loginClicked() {
      //hardcode authentication: ying ying
      if (this.state.username === "ying" && this.state.password === "ying") {
        AuthenticationService.registerSuccessfulLogin(this.state.username);
        this.props.navigate(`/welcome/${this.state.username}`);
      } else {
        this.setState({
          showSuccessfulMsg: false,
          failValidation: true,
        });
      }
      // console.log(this.state);
    }
  
  }

  export default LoginComponent;