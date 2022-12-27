import axios from 'axios';
  
// let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOCIsImlhdCI6MTY3MjAzNTkxNCwiZXhwIjoxNjcyMTIyMzE0fQ.YcwDLXjCeWexctuXVBMs4skiA1k-68kh1DUVWAfMxS8rx4yioOxLe_JAWoKlaWfuPUdYnq9wa4_-vPYLdEReSQ"

let token = localStorage.getItem('token')

export default axios.create({
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
  }
});
