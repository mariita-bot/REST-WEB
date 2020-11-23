import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export function obtenerCategoriaGet() {
  return Axios.get(`${baseUrl}/categoria`);
}

export function obtenerCategoriaPorId(IdCategoria) {
  return Axios.get(`${baseUrl}/categoria/${IdCategoria}`);
}