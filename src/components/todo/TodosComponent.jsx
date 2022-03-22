import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TodoService from "../api/todo-api/TodoService";
import AuthenticationService from "./AuthenticationService";

class TodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedUsername();
    TodoService.retrieveAllTodos(username)
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch((error) => console.log(error));
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
                  <td>{todo.targetDate.toString()}</td>
                  <td>{todo.done.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

export default TodosComponent;
