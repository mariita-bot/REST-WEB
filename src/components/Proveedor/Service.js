import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export async function obtenerProveedoresGet() {
  return await Axios.get(`${baseUrl}/proveedor`);
}

export async function insertarProveedorPost (Proveedor) {
  return await Axios.post(`${baseUrl}/proveedor`, Proveedor )
}

export async function borrarProveedorDelete (IdProveedor) {
  return await Axios.delete(`${baseUrl}/proveedor/${IdProveedor}`);
}

export async function obtenerProveedorPorId(IdProveedor) {
  return await Axios.get(`${baseUrl}/proveedor/${IdProveedor}`);
}

export async function editarProveedorPut (IdProveedor,Proveedor) {
  return await Axios.put(`${baseUrl}/proveedor/${IdProveedor}` , Proveedor )
}