import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TodoService from "../api/todo-api/TodoService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentId: 0,
      message: null,
    };
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.refreshTodoList = this.refreshTodoList.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
  }

  componentDidMount() {
    this.refreshTodoList();
  }

  refreshTodoList() {
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
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <Container>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>TARGET DATE</th>
                <th>IS COMPLETED?</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{moment(todo.targetDate).format("DD-MMM-YYYY")}</td>
                  <td>{todo.done.toString()}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={this.addTodoClicked}>Add a New Todo</button>
        </Container>
      </div>
    );
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedUsername();
    TodoService.deleteTodo(username, id).then((response) => {
      this.setState({ message: `Deleted todo ${id} successfully` });
      this.refreshTodoList();
    });
  }

  updateTodoClicked(id) {
    this.props.navigate(`/todos/${id}`);
  }

  addTodoClicked() {
    this.props.navigate('/todos/newtodo');
  }
}

export default ListTodosComponent;
