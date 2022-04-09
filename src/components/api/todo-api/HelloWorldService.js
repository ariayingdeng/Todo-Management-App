import axios from "axios";
import { API_URL } from "../../Constants";

class HelloWorldService {
  executeHelloWorldService() {
    return axios.get(`${API_URL}/hello-world`);
  }

  executeHelloWorldBeanService() {
    return axios.get(`${API_URL}/hello-world-bean`);
  }

  executeHelloWorldPathVariableService(name) {
    // let username = "ying";
    // let password = "ying328";
    // let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return axios.get(
      `${API_URL}/hello-world-bean/path-variable/${name}`
    //   ,
    //   {
    //     headers: {
    //       authorization: basicAuthHeader,
    //     },
    //   }
    );
  }
}

export default new HelloWorldService();
