import { Modal, Button, Input, Row, Col, Tooltip, Space, Table,
  Switch, InputNumber, message, Select,  
  Form,  } from 'antd';
import React, { useState, useEffect } from 'react';
import openNotification from '../Extra/Notification';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


import { 
  insertarPedidoPost,
  obtenerMesasGet,
  obtenerMeserosGet,
  obtenerProductosGet,
} from './Service';


const { Option } = Select;

const { TextArea } = Input;

const layout={
  labelCol:{
    span:10
  },
  wrapperCol:{
    span :16
  }
}



function VentanaAgregarPedido(props){

  const [ estadoModalAgregar, setestadoModalAgregar ] = useState({
    visible: false,
  });

  const [ productosTabla, setProductosTabla] = useState([]);

  const [ meserosLista , setMeserosLista ] = useState ([]);

  const [ productosLista , setProductosLista ] = useState ([]);

  const [ mesasLista , setMesasLista ] = useState ([]);

  const [valoresPedidoNuevo, setValoresPedidoNuevo] = useState({
    NombreCategoria : "",
  })

  function showModal () {
    setestadoModalAgregar({visible: true});
    llenarDatos();
  };

  function handleOk (e) {
    console.log(e);
  };

  function handleCancel (e) {
    setestadoModalAgregar({visible: false})
  };

  const columnsProducts = [
    {
      title: 'ID',
      dataIndex: 'idProducto',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nombre Producto',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Cantidad',
      dataIndex: 'observacion',
      key: 'observacion',
    },
    {
      title: 'Accion',
      key: 'accion',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title='Eliminar'>
           <Button danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];


  async function llenarDatos () { 

    await Promise.all([
      obtenerMeserosGet(),
      obtenerMesasGet(),
      obtenerProductosGet()
    ]).then(responses => {
      setMesasLista(responses[1].data);
      setMeserosLista(responses[0].data);
      setProductosLista(responses[2].data) 
      
    }).catch(error => {
      message.error(error.toString() )
      openNotification("Eliminado Fallado", "La categoría no fue borrada correctamente, intente nuevamente", "error")
    })


  }



  async function formFinish (values) {
    console.log(values);

    await Promise.all([
      insertarPedidoPost ( values),
    ]).then(responses => {

      console.log(responses);

      openNotification("Notificación", "Pedido agregado correctamente." , "success")

      setestadoModalAgregar({
        visible: false, 
        pedido: undefined,
      })

      props.obtenerPedidos();
      
    }).catch(error => {
      message.error(error.toString())
      console.log(error.toString());
      openNotification("Alerta", "Error agregando el pedido, revise la consola para más detalles", "error"  )
    })

  }


  async function insertarPedido () {
    try {
      const responses = await insertarPedidoPost(valoresPedidoNuevo);

      if (responses) {

        openNotification("Notificación", "Pedido agregado correctamente." , "success")
        handleCancel();
        //Reset default values
        setValoresPedidoNuevo({
          NombrePedido : "",
        })
  
        await updateTableParent();

      }



    }catch (error) {
      message.error(error.toString())
      openNotification("Alerta", "Error insertando el pedido, revise la consola para más detalles", "error"  )
    }

  }

  async function updateTableParent() {
    await props.actualizarPedidos();
  }

  function onChangeNombreCategoria (e) {
    setValoresPedidoNuevo(prevState => ({...prevState, NombreCategoria: e.target.value}))
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar nuevo Pedido
      </Button>
      <br></br>
      <Modal
        title="Agregar Nuevo Pedido"
        visible={estadoModalAgregar.visible}
        onOk={handleOk}
        footer={null}
        width={800}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div>

          <Form 
            id="formularioPedidoNuevo" 
            {...layout}
            onFinish={(values) => formFinish(values)}
          >
            <Form.Item
              name="NombreCliente"
              label="Nombre del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="TelefonoCliente"
              label="Telefono del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="CedulaCliente"
              label="Cedula del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="CedulaCliente"
              label="Cedula del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="Observacion"
              label="Observacion / detalle"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item name="NumMesa" label="Numero mesa">
              <Select>
                {mesasLista?.map(function(d, idx){
                  return (<Select.Option key={d.IdMesa} value={d.IdMesa}>N# {d.Numero}</Select.Option>)
                })}
              </Select>
            </Form.Item>

            <Form.Item name="Mesero" label="Mesero">
              <Select>
                {meserosLista?.map(function(d, idx){
                  return (<Select.Option key={d.IdEmpleado} value={d.IdEmpleado}>{d.NombreEmpleado}</Select.Option>)
                })}

              </Select>
            </Form.Item>

            <Form.Item label="Ya pagado?" name="pagado">
              < Switch />
            </Form.Item>

            <label> Productos </label>

            <Table columns={columnsProducts} dataSource={productosTabla} ></Table>

            </Form>
        
          <center>
            <Button type='primary' htmlType="submit" form="formularioPedidoNuevo">Guardar</Button>
          </center>
        </div>

      </Modal>
    </div>
  );
}

export default VentanaAgregarPedido;