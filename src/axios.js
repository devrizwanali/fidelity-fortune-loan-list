import axios from 'axios';
  
let token = localStorage.getItem('token')
export default axios.create({
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
  }
});
