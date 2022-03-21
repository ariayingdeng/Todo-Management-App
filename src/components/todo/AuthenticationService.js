class AuthenticationService {
  registerSuccessfulLogin(username) {
    sessionStorage.setItem("authenticatedUser", username);
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }
}

export default new AuthenticationService();
