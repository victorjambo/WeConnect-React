import decode from 'jwt-decode';

function isTokenValid() {
  let token = null;
  try {
    token = window.sessionStorage.getItem('token');
  } catch (e) {
    return false;
  }
  if(!token) {
    return false;
  }
  try {
    let { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      window.sessionStorage.removeItem('token');
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

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