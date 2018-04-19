import request from 'superagent';

export const post = (url, data) => {
  return request
    .post(url)
    .set('Content-Type', 'application/json')
    .send(data);
};

export const putRequest = (url, data, token) => {
  return request
    .put(url)
    .type('application/json')
    .set({'x-access-token': token})
    .send(data);
};

export const getRequest = (url) => {
  return request
    .get(url)
    .set('Content-Type', 'application/json');
};

export const uploadImage = (file) => {
  return request
    .post('https://api.cloudinary.com/v1_1/dhic9kypo/image/upload')
    .attach("file", file)
    .field("upload_preset", "zwl9qrsr")
    .field("api_key", "231513992291381")
    .field("timestamp", (Date.now() / 1000) | 0);
};
