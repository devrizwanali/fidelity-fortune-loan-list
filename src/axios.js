import axios from 'axios';
import router from './router'

const baseURL = `http://13.40.61.15:8080/lms/api`
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


instance.interceptors.response.use(null, function (error) {
  if (error?.response?.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }
  return Promise.reject(error)
})

export default instance;
