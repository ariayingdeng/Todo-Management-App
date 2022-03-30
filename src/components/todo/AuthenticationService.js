import axios from "axios";

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    return axios.get("http://localhost:8080/basicauth", {
      headers: {
        authorization: this.createBasicAuthHeader(username, password),
      },
    });
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem("authenticatedUser", username);
    this.setupAxiosInterceptors(this.createBasicAuthHeader(username, password));
  }

  createBasicAuthHeader(username, password) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }

  getLoggedUsername() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptors(basicAuthHeader) {
    axios.interceptors.request.use((config) => {
      if (this.isLoggedIn()) {
        config.headers.common.Authorization = basicAuthHeader;
      }
      return config;
    });
  }
}

export default new AuthenticationService();
