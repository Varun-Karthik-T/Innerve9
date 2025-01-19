import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.16.49.130:4000',
});

export default api;