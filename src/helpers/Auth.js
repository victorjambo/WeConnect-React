import decode from 'jwt-decode';

/**
 * checks validility and presence of token in storage
 * @returns {bool} true or false
 */
const isTokenValid = () => {
  let token = null;
  let response = true;
  try {
    token = window.sessionStorage.getItem('token');
  } catch (e) {
    response = false;
  }
  if (!token) {
    response = false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      window.sessionStorage.removeItem('token');
      response = false;
    }
  } catch (e) {
    response = false;
  }
  return response;
};

/**
 * object to check auth status
 */
const Auth = {
  isAuthenticated: isTokenValid(),
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
  }
};

export default Auth;
