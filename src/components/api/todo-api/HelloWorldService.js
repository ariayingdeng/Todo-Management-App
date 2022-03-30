import axios from "axios";

class HelloWorldService {
  executeHelloWorldService() {
    return axios.get("http://localhost:8080/hello-world");
  }

  executeHelloWorldBeanService() {
    return axios.get("http://localhost:8080/hello-world-bean");
  }

  executeHelloWorldPathVariableService(name) {
    // let username = "ying";
    // let password = "ying328";
    // let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return axios.get(
      `http://localhost:8080/hello-world-bean/path-variable/${name}`
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
