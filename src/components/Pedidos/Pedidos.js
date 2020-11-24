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
import { EditOutlined, DollarOutlined } from '@ant-design/icons';
import { 
  obtenerCategoriaPorId, 
  obtenerCategoriaGet,
  borrarCategoriaDelete,
  editarCategoriaPut,
  obtenerPedidosGet,
  pagarPedidoPost
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


  async function pagarPedido (record) {

    setTablaCargando(true);

    await Promise.all([
      pagarPedidoPost (record.IdPedido)
    ]).then(responses => {
      setTablaCargando(false)
      openNotification("Eliminado", "Pedido pagado correctamente", "success")
      obtenerPedidos();
    }).catch(error => {
      message.error(error.toString() )
      openNotification("Operación Fallada", "El pedido no fue pagado correctamente, intente nuevamente", "error")
      setTablaCargando(false)
    })

  }

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
      render: (text, record) => (
        (text === 0 ? "No Pagado" : "Pagado" )
      )
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
    {
      title: 'Accion',
      key: 'accion',
      render: (text, record) => (
        <Space size="middle">

          { record.Estado === 0 ?  

          <Tooltip title='Pagar'>
            <Button onClick={ async () => { pagarPedido(record) } } ><DollarOutlined /> </Button>
          </Tooltip>
          
          :

          <Tooltip title='Ya pagado'>
            <Button onClick={ async () => { pagarPedido(record) } } disabled><DollarOutlined /> </Button>
          </Tooltip>
          
        }

          
        </Space>
      ),
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