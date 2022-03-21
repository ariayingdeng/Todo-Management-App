import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import withNavigation from "./WithNavigation";
import withParams from "./WithParams";
import { Container, Navbar, Nav } from "react-bootstrap";
import AuthenticationService from "./AuthenticationService";
import AuthenticatedRoute from "./AuthenticatedRoute";

class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    return (
      <div>
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
            <Route
              path="/welcome/:name"
              element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>}
            />
            <Route path="/todos" element={<AuthenticatedRoute><TodosComponents /></AuthenticatedRoute>} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

// function ShowLoginMessage(props) {
//   if (props.showLoginMessage) {
//     return <div>Login Successfully</div>;
//   }
//   if (props.failValidation) {
//     return <div>Invalid Credentials</div>;
//   }
//   return null;
// }

class TodosComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          description: "Start to learn React",
          targetDate: new Date(),
          done: false,
        },
        {
          id: 2,
          description: "Become an expert at React",
          targetDate: new Date(),
          done: false,
        },
        {
          id: 3,
          description: "Start to learn Spring Boot",
          targetDate: new Date(),
          done: false,
        },
        {
          id: 4,
          description: "Become an expert at Spring Boot",
          targetDate: new Date(),
          done: false,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>TODO LIST</h1>
        <Container>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>TARGET DATE</th>
                <th>IS COMPLETED?</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.targetDate.toDateString()}</td>
                  <td>{todo.done}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

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

  // handleUsernameChange(event) {
  //     console.log(event.target.value);
  //     this.setState({
  //         username : event.target.value
  //     });
  // }

  // handlePasswordChange(event) {
  //     console.log(event.target.value);
  //     this.setState({
  //         password : event.target.value
  //     });
  // }
}

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

function ErrorComponent() {
  return <div>An error occurred. Please check the link.</div>;
}

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

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isLoggedIn();
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/welcome/ying">Aria's</Navbar.Brand>
          {isUserLoggedIn && (<Navbar.Collapse>
              <Nav.Link className="navbar-link" href="/welcome/ying">
                Home
              </Nav.Link>
              <Nav.Link className="navbar-link" href="/todos">
                Todos
              </Nav.Link>
          </Navbar.Collapse>)}
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

class FooterComponent extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="text-muted">All Rights Reserved 2022 @Aria's</span>
        </footer>
      </div>
    );
  }
}

export default TodoApp;
