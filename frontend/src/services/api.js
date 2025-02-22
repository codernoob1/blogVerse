import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Now relative thanks to proxy
    withCredentials: true,
  });

// Add request interceptor to include auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const signup = async (credentials) => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const signin = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};


export const getCurrentUser = async () => {
    const response = await api.get('/auth/user');
    return response.data;
  };

export default api;