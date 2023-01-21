import axios from 'axios';
import router from './router'

const baseURL = `http://18.132.203.26:8080/lms/api`
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
  if (error.response.status === 401) {
    console.log('Failed to login')
    localStorage.removeItem('token')
    router.push('/')
  }
  return Promise.reject(error)
})

export default instance;
