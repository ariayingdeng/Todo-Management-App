import axios from "axios";
import { API_URL } from "../../Constants";

class TodoService {
  retrieveAllTodos(name) {
    // let username = "ying";
    // let password = "ying328";
    // let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

    return axios.get(`${API_URL}/users/${name}/todos`
    // , {
    //   headers: {
    //     authorization: basicAuthHeader,
    //   },
    // }
    );
  }

  retrieveTodo(name, id) {
    return axios.get(`${API_URL}/users/${name}/todos/${id}`);
  }

  deleteTodo(name, id) {
    return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
  }

  updateTodo(name, id, todo) {
    return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
  }

  addTodo(name, todo) {
    return axios.post(`${API_URL}/users/${name}/todos`, todo);
  }
}

export default new TodoService();
