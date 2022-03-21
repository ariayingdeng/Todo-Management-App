import React, { Component } from "react";
import { Container } from "react-bootstrap";

class TodosComponent extends Component {
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

export default TodosComponent;
