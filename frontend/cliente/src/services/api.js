// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta la URL según tu configuración
});

export default instance;
