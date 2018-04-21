import decode from 'jwt-decode';
import Auth from '../Components/Auth/Auth';
import { BASE_URL } from './url';
import { getRequest } from './request';

var userId = 'adasdsa';
const setValue = (user) => {
  userId = user;
}
const isCurrentUser = () => {
  if(Auth.isAuthenticated) {
    let token = window.sessionStorage.getItem('token');
    let { id } = decode(token);
    let url = `${BASE_URL}/api/v2/users/${id}`;
    getRequest(url).then((res) => {setValue(res.body.user.id)});
    if(userId === id) {
      console.log(userId, id);
      return true;
    }
    console.log(userId, id);
    return false;
  }
  console.log(userId);
  return false;
}


