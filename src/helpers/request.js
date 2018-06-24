import request from 'superagent';
import BASE_URL from './url';

export const post = (url, data) => request
  .post(url)
  .set('Content-Type', 'application/json')
  .send(data);

export const putRequest = (url, data, token) => request
  .put(url)
  .type('application/json')
  .set({ 'x-access-token': token })
  .send(data);

export const getRequest = (url) => request
  .get(url)
  .set('Content-Type', 'application/json');

export const uploadImage = (file) => request
  .post('https://api.cloudinary.com/v1_1/dhic9kypo/image/upload')
  .attach('file', file)
  .field('upload_preset', 'zwl9qrsr')
  .field('api_key', '231513992291381')
  .field('timestamp', (Date.now() / 1000) | 0);

export const search = (url, query) => request
  .get(BASE_URL + url + query)
  .set('Content-Type', 'application/json');
