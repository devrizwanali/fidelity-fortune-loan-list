import axios from 'axios';

const baseURL = `http://52.56.181.31:8080/lms/api`
let instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
