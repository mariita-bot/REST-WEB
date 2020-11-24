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
  borrarProveedorDelete,
  obtenerProveedoresGet,
  obtenerProveedorPorId,
  editarProveedorPut
} from './Service';

import openNotification from '../Extra/Notification';
import VentanaAgregarProveedor from './AgregarProveedor';

const layout={
  labelCol:{
    span:10
  },
  wrapperCol:{
    span :16
  }
}

function Proveedor(){

  const [ proveedorTabla, setProveedorTabla] = useState([]);
  const [ estadoModalEditar, setEstadoModalEditar ] = useState({
    visible: false,
    proveedor: undefined,
  });

  const [tablaCargando , setTablaCargando ] = useState(false);
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'IdProveedor',
      key: 'IdProveedor',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nombre del proveedor',
      dataIndex: 'NombreProveedor',
      key: 'NombreProveedor',
    },
    {
      title: 'Direccion',
      dataIndex: 'Direccion',
      key: 'Direccion',
    },
    {
      title: 'Telefono',
      dataIndex: 'Telefono',
      key: 'Telefono',
    },
    {
      title: 'Accion',
      key: 'accion',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title='Editar'>
            <Button 
              type='primary'
              onClick={ async () => {
                await Promise.all([
                  obtenerProveedorPorId(record.IdProveedor),
                  obtenerProveedoresGet()
                ]).then(responses => {
                  setEstadoModalEditar({
                    visible: true,
                    proveedor: responses[0].data
                  })
                 
                }).catch(error => message.error(error.toString()))
              }}
            >
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title='Eliminar'>
          <Button onClick={ async () => { borrarProveedor(record) } } danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  function borrarProveedor ( proveedor ) {
    Modal.confirm({
      title: 'Confirmación',
     
      content: '¿Estás seguro de borrar al proveedor ' + proveedor.NombreProveedor ,
      okText: 'Aceptar',
      cancelText: 'Cancelar',
      onOk: () => { borrarProveedorDB(proveedor) } 
    });
  }

  async function borrarProveedorDB (proveedor) {

    setTablaCargando(true);

    await Promise.all([
      borrarProveedorDelete (proveedor.IdProveedor)
    ]).then(responses => {
      setTablaCargando(false)
      openNotification("Eliminado", "Proveedor eliminado correctamente", "success")
      obtenerProveedores();
    }).catch(error => {
      message.error(error.toString() )
      openNotification("Eliminado Fallado", "El proveedor no fue borrado correctamente, intente nuevamente", "error")
      setTablaCargando(false)
    })

  }

  async function formFinish (values) {
    console.log(values);

    await Promise.all([
      editarProveedorPut ( estadoModalEditar.proveedor.IdProveedor , values),
    ]).then(responses => {

      console.log(responses);

      openNotification("Notificación", "Proveedor editado correctamente." , "success")

      setEstadoModalEditar({
        visible: false, 
        proveedor: undefined,
      })

      obtenerProveedores();

    }).catch(error => {
      message.error(error.toString())
      console.log(error.toString());
      openNotification("Alerta", "Error editando el Proveedor, revise la consola para más detalles", "error"  )
    })


  }

  async function obtenerProveedores () {
    try {
      setTablaCargando (true);
      const response = await obtenerProveedoresGet();

      if (response.data){

        console.log(response.data);

        setProveedorTabla(response.data)
        setTablaCargando(false);
      }
    } catch (error) {
      setTablaCargando(false);
      message.error(error.toString());
      
    }
  }

  useEffect(() =>{
    obtenerProveedores();
  },[])


  return(
    <>
      <VentanaAgregarProveedor actualizarProveedor={obtenerProveedores} > </VentanaAgregarProveedor>
      <Table loading={tablaCargando} rowKey="IdProveedor" columns={columns} dataSource={proveedorTabla} />

      <Modal
      visible={estadoModalEditar.visible}
      title="Editar Proveedor"
      maskClosable={false}
      width={800}
      onCancel={() => setEstadoModalEditar({visible: false, proveedor: null})}
      footer={[
        <Button key='1'>Cancelar</Button>,
        <Button key='2' type='primary' htmlType="submit" form="formularioProveedorEditar">Guardar</Button>
      ]}
    >
    { estadoModalEditar.visible === true ? <Form 
      id="formularioProveedorEditar" 
      {...layout}
      onFinish={(values) => formFinish(values)}
    >
      <Form.Item
        initialValue = {estadoModalEditar.proveedor?.NombreProveedor} 
        label="Nombre del Proveedor"
        name="NombreProveedor"
        required tooltip="Este es un campo requerido"
        rules={[
          {requiered: true}
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        initialValue = {estadoModalEditar.proveedor?.Direccion} 
        label="Dirección del Proveedor"
        name="Direccion"
        required tooltip="Este es un campo requerido"
        rules={[
          {requiered: true}
        ]}
      >   
      <Input/>
      </Form.Item>
      <Form.Item
        initialValue = {estadoModalEditar.proveedor?.Telefono} 
        label="Teléfono del Proveedor"
        name="Telefono"
        required tooltip="Este es un campo requerido"
        rules={[
          {requiered: true}
        ]}
      >   
      <Input/>
      </Form.Item>

    
      </Form> : <div>Cargando</div>}
    </Modal>
    
    </>
  );
};

export default Proveedor;