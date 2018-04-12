import decode from 'jwt-decode';

function isTokenValid() {
  let token = sessionStorage.getItem('token');
  if(!token) {
    return false;
  }
  try {
    let { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      sessionStorage.removeItem('token');
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