import request from 'superagent';

export const post = (url, data) => {
  return request
    .post(url)
    .set('Content-Type', 'application/json')
    .send(data);
};