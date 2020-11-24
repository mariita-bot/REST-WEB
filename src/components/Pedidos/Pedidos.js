import React, { useEffect, useState } from 'react';
import { 
  Table, 
  Space, 
  Button, 
  Tooltip, 
  message, 
  Input,
  Form,
  Modal 
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  obtenerCategoriaPorId, 
  obtenerCategoriaGet,
  borrarCategoriaDelete,
  editarCategoriaPut,
  obtenerPedidosGet
} from './Service';

import openNotification from '../Extra/Notification';
import VentanaAgregarPedido from './AgregarPedido';

const layout={
  labelCol:{
    span:10
  },
  wrapperCol:{
    span :16
  }
}


function Pedidos(){

  const [ pedidoTabla, setPedidoTabla] = useState([]);
  const [ estadoModalEditar, setEstadoModalEditar ] = useState({
    visible: false,
    pedido: undefined,
  });


  
  const obtenerPedidos = async() =>{
    //console.log("im here");
    try {
      setTablaCargando (true);
      const response = await obtenerPedidosGet();

      if (response.data){

        console.log(response.data);

        setPedidoTabla(response.data)
        setTablaCargando(false);
      }
    } catch (error) {
      setTablaCargando(false);
      message.error(error.toString());
      
    }
  }

  useEffect(() =>{
    obtenerPedidos();
  },[])

  const [tablaCargando , setTablaCargando ] = useState(false);

  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'IdPedido',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      key: 'estado',
    },
    {
      title: 'Nombre cliente',
      dataIndex: ['Cliente','NombreCliente'],
      key: 'idPedido'
    },
    {
      title: 'Observacion',
      dataIndex: 'Observacion',
      key: 'observacion',
    },
    {
      title: 'Numero de mesa',
      dataIndex: 'MesaNumero',
    },
    {
      title: 'Mesero',
      dataIndex: ['Empleado','NombreEmpleado'],
      key: 'mesero',
    },
  ];

  
  return(
    <div>
      <VentanaAgregarPedido></VentanaAgregarPedido>
      <Table columns={columns} dataSource={pedidoTabla}/>

    </div>
  );
};

export default Pedidos;