import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Authorization': `Bearer ${localStorage.token}`,
    'Content-Type': 'application/json'
  }
})

export default api;