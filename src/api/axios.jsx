import axios from 'axios';
import { API_SERVER_URL } from '@utils/constant.jsx';

const api = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
  timeout: 5000
});

export default api;
