import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export async function obtenerCategoriaGet() {
  return await Axios.get(`${baseUrl}/categoria`);
}

export async function obtenerCategoriaPorId(IdCategoria) {
  return await Axios.get(`${baseUrl}/categoria/${IdCategoria}`);
}

export async function insertarCategoriaPost (Categoria) {
  return await Axios.post(`${baseUrl}/categoria`, Categoria )
}

export async function editarCategoriaPut (IdCategoria,Categoria) {
  return await Axios.put(`${baseUrl}/categoria/${IdCategoria}` ,Categoria )
}

export async function borrarCategoriaDelete (IdCategoria) {
  return await Axios.delete(`${baseUrl}/categoria/${IdCategoria}`);
}