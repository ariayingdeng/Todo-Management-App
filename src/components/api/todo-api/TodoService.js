import axios from "axios";

class TodoService {
    retrieveAllTodos(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }
}

export default new TodoService();