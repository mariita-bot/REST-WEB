import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export function obtenerMesasGet() {
  return Axios.get(`${baseUrl}/mesa`);
}

export function cambiarEstadoDeMesa(body) {
  return Axios.put(`${baseUrl}/mesa`, body)
}