import axios from "axios";
import { API_URL } from "../Constants";

export const USERNAME_SESSION = "authenticatedUser";

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: {
        authorization: this.createBasicAuthHeader(username, password),
      },
    });
  }

  executeJwtAuthenticationService(username, password) {
    return axios.post(`${API_URL}/authenticate`, {
        username,  password 
    });
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(USERNAME_SESSION, username);
    this.setupAxiosInterceptors(this.createBasicAuthHeader(username, password));
  }

  registerSuccessfulLoginWithJwt(username, token) {
    sessionStorage.setItem(USERNAME_SESSION, username);
    this.setupAxiosInterceptors(this.createJwtAuthHeader(token));
  }

  createJwtAuthHeader(token) {
    return "Bearer " + token;
  }

  createBasicAuthHeader(username, password) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  logout() {
    sessionStorage.removeItem(USERNAME_SESSION);
  }

  isLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION);
    if (user === null) return false;
    return true;
  }

  getLoggedUsername() {
    let user = sessionStorage.getItem(USERNAME_SESSION);
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use((config) => {
      if (this.isLoggedIn()) {
        config.headers.common.Authorization = token;
      }
      return config;
    });
  }
}

export default new AuthenticationService();
