import Axios from 'axios'; 
import { baseUrl } from '../../API/API';

export async function obtenerPedidosGet() {
  return await Axios.get(`${baseUrl}/pedido`);
}

export async function insertarPedidoPost(pedido) {
  return await Axios.post(`${baseUrl}/pedido`, pedido);
}


export async function obtenerProductosGet() {
  return await Axios.get(`${baseUrl}/producto`);
}

export async function obtenerMeserosGet() {
  return await Axios.get(`${baseUrl}/mesa/empleados`);
}

export async function obtenerMesasGet() {
  return await Axios.get(`${baseUrl}/mesa/mesasdisponibles`);
}

export async function pagarPedidoPost (idPedido) {
  return await Axios.post(`${baseUrl}/pedido/pagarpedido/`+idPedido  );
}