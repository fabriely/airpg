import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_PUBLIC,
});

export default api;
