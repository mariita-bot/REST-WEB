import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export function obtenerCategoriaGet() {
  return Axios.get(`${baseUrl}/categoria`);
}

export function obtenerCategoriaPorId(IdCategoria) {
  return Axios.get(`${baseUrl}/categoria/${IdCategoria}`);
}

export function insertarCategoriaPost (Categoria) {
  return Axios.post(`${baseUrl}/categoria`, Categoria )
}