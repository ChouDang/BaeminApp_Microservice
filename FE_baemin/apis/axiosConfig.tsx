// axiosConfig.ts
import axios from 'axios';

export const API_URL = 'http://localhost:8080'; 

const getToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
