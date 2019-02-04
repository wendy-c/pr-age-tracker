let authToken = "";

class TokenManager {
  get() {
    return authToken;
  }

  set(token: string) {
    authToken = token;
  }
}

export default new TokenManager();