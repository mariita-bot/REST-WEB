import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export function obtenerProductoGet() {
  return Axios.get(`${baseUrl}/producto`);
}

export function obtenerProductoPorId(IdProducto) {
  return Axios.get(`${baseUrl}/producto/${IdProducto}`);
}

export function obtenerCategoriasGet() {
 return Axios.get(`${baseUrl}/categoria`)
}

export function obtenerProveedoresGet() {
  return Axios.get(`${baseUrl}/proveedor`)
}


export function insertarProductoPost(Producto) {
  return Axios.post(`${baseUrl}/producto`,Producto )
}

export function editarProductoPut(IdProducto, Producto) {
  return Axios.put(`${baseUrl}/producto/${IdProducto}` ,Producto )
}

export function borrarProductoDelete (IdProducto) {
  return Axios.delete(`${baseUrl}/producto/${IdProducto}`);
}