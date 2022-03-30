import axios from "axios";

class TodoService {
  retrieveAllTodos(name) {
    // let username = "ying";
    // let password = "ying328";
    // let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

    return axios.get(`http://localhost:8080/users/${name}/todos`
    // , {
    //   headers: {
    //     authorization: basicAuthHeader,
    //   },
    // }
    );
  }

  retrieveTodo(name, id) {
    return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
  }

  deleteTodo(name, id) {
    return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
  }

  updateTodo(name, id, todo) {
    return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
  }

  addTodo(name, todo) {
    return axios.post(`http://localhost:8080/users/${name}/todos`, todo);
  }
}

export default new TodoService();
