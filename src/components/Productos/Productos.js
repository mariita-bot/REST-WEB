import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Tooltip, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  obtenerProductoGet, 
  obtenerProductoPorId, 
  obtenerCategoriasGet,
  obtenerProveedoresGet 
} from './Service';

import VentanaAgregarProductos from './AgregarProducto';

const layout={
  labelCol:{
    span:10
  },
  wrapperCol:{
    span :16
  }
}

const { Option } = Select;

function Productos(){
  
  const [ productosTabla, setProductosTabla ] = useState([]);
  const [ estadoModalEditar, setestadoModalEditar ] = useState({
    visible: false,
    producto: undefined,
    categorias: undefined,
    proveedores: undefined
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'IdProducto',
      key: 'id'
    },
    {
      title: 'Nombre del producto',
      dataIndex: 'NombreProducto',
      key: 'nombre',
    },
    {
      title: 'Precio',
      dataIndex: 'PrecioVenta',
      key: 'precio',
    },
    {
      title: 'Descripcion',
      dataIndex: 'Descripcion',
      key: 'descripcion',
    },
    {
      title: 'Tamaño',
      dataIndex: 'Tamanio',
      key: 'tamano',
    },
    {
      title: 'Stock',
      key: 'stock',
      render: (_, record) => {
        let cantidad = 0;
        record.ProveeProductos.forEach(element => {
          cantidad += element.Cantidad;
        });
        return(
          <div>
            {cantidad}
          </div>
        )
      }
    },
    {
      title: 'Categoria',
      key: 'categoria',
      render: (text, record) =>{
        return(
          <div>
            {record.Categoria?.NombreCategoria}
          </div>
        )
      }
    },
    {
      title: 'Proveedor',
      key: 'proveedor',
      render: (_, record) =>{
        return(
          <div>
            {record.ProveeProductos[0]?.Proveedor?.NombreProveedor}
          </div>
        )
      }
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
                  obtenerProductoPorId(record.IdProducto),
                  obtenerCategoriasGet(),
                  obtenerProveedoresGet()
                ]).then(responses => {
                  setestadoModalEditar({
                    visible: true, 
                    producto: responses[0].data, 
                    categorias: responses[1].data,
                    proveedores: responses[2].data
                  })
                }).catch(error => message.error(error.toString()))
             }}
            >
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title='Eliminar'>
           <Button danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const obtenerProductos = async() =>{
    try {
      const response = await obtenerProductoGet();
      console.log(response);
      if (response.data){

        setProductosTabla(response.data)
      }
    } catch (error) {
      message.error(error.toString());
    }
  }

  const formFinish = (values) =>{
    console.log(values);
  }

  useEffect(() =>{
    obtenerProductos();
  },[])

  return(
    <div>
      <VentanaAgregarProductos actualizarProductos={obtenerProductos}> </VentanaAgregarProductos>
      <Table rowKey="IdProducto" columns={columns} dataSource={productosTabla}/>
      <Modal
        visible={estadoModalEditar.visible}
        title="Editar Producto"
        maskClosable={false}
        onCancel={() => setestadoModalEditar({visible: false, producto: null, categorias: null} )}
        footer={[
          <Button key='1'>Cancelar</Button>,
          <Button key='2' type='primary' htmlType="submit" form="formularioProductoEditar">Guardar</Button>
        ]}
        >
        { estadoModalEditar.visible === true ? <Form 
          id="formularioProductoEditar"
          {...layout}
          onFinish={(values) => formFinish(values)}
        >
          <Form.Item
            initialValue={estadoModalEditar.producto.NombreProducto}
            name="NombreProducto"
            label = "Nombre del Producto"
            required tooltip="Este es un campo requerido"
            rules={[
              {required: true, message: 'Por favor ingrese un nombre!'}
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item 
            initialValue = {estadoModalEditar.producto.PrecioVenta}
            name="PrecioVenta"
            label = "Precio"
            required tooltip="Este es un campo requerido"
            rules={[
              { required: true, message: 'Por favor ingrese un precio!', pattern: /^[1-9]+$/ }
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
          initialValue = {estadoModalEditar.producto.Descripcion}
           name="Descripcion"
           label = "Descripcion">
            <Input/>
          </Form.Item>

          <Form.Item 
            initialValue = {estadoModalEditar.producto.Tamanio}
            name="Tamanio"
            label = "Tamaño"
            required tooltip="Este es un campo requerido"
            rules={[
              {required: true, message: 'Por favor ingrese un tamaño!'}
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
            initialValue = {estadoModalEditar.producto.Categoria.IdCategoria}
            name="categoria"
            label = "Categoria"
            required tooltip="Este es un campo requerido"
            rules={[
              {required: true}
            ]}
          >
            <Select style={{ width: 120 }}>
              { estadoModalEditar.categorias.map((cat,index) =>{
                return <Option key={index} value={cat.IdCategoria}>{cat.NombreCategoria}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            initialValue={estadoModalEditar.producto.ProveeProductos[0].Proveedor.IdProveedor}
            name="proveedor"
            label = "Proveedor"
            required tooltip="Este es un campo requerido"
            rules={[
              {required: true}
            ]}
          >
            <Select style={{ width: 120 }}>
              { estadoModalEditar.proveedores.map((cat,index) =>{
                return <Option key={index} value={cat.IdProveedor}>{cat.NombreProveedor}</Option>
              })}
            </Select>
          </Form.Item>

          </Form> : <div>Cargando</div>}
      </Modal>

    </div>
  );
}

export default Productos;