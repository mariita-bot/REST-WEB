import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Tooltip, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { baseUrl } from '../../API/API';
import Axios from 'axios';

const layout={
  labelCol:{
    span:8
  },
  wrapperCol:{
    span :16
  }
}

function Productos(){
  
  const [ data, setData ] = useState([]);
  const [ estadoModalEditar, setestadoModalEditar ] = useState({
    visible: false,
    producto: null,
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
      render: (text, record) => {
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
            {record.Categoria.NombreCategoria}
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
            {record.ProveeProductos[0].Proveedor.NombreProveedor}
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
            <Button type='primary' onClick={()=>obtenerProductoPorId(record.IdProducto)}><EditOutlined/></Button>
          </Tooltip>
          <Tooltip title='Eliminar'>
           <Button danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const obtenerProductoGet = async() =>{
    await Axios.get(baseUrl+"/producto")
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      message.error(error.toString());
    })
  }

  useEffect(() =>{
    obtenerProductoGet();
  },[])

  const obtenerProductoPorId = async(IdProducto) =>{
    await Axios.get(baseUrl+"/producto/"+IdProducto)
    .then(response=>{
      console.log(response)
      setestadoModalEditar({visible: true, producto: response.data});
    }).catch(error=>{
      message.error(error.toString());
    })
  }

  return(
    <div>
      <Table rowKey="IdProducto" columns={columns} dataSource={data}/>
      <Modal
        visible={estadoModalEditar.visible}
        title="Editar Producto"
        onCancel={() => setestadoModalEditar({visible: false, producto: null})}
        >
        { estadoModalEditar.producto != undefined ? <Form {...layout}>
          <Form.Item
          initialValue = {estadoModalEditar.producto.NombreProducto}
          name="NombreProducto"
          label = "Nombre del Producto">
            <Input/>
          </Form.Item>

          <Form.Item 
          initialValue = {estadoModalEditar.producto.PrecioVenta}
          name="PrecioVenta"
          label = "Precio">
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
          label = "Tamaño">
            <Input/>
          </Form.Item>

          <Form.Item 
          initialValue = {estadoModalEditar.producto.ProveeProductos[0].Proveedor.NombreProveedor}
          name="NombreProveedor"
          label = "Nombre del Proveedor">
            <Input/>
          </Form.Item>

          <Form.Item 
          initialValue = {estadoModalEditar.producto.Categoria.NombreCategoria}
          name="categoria"
          label = "Categoria">
            <Input/>
          </Form.Item>

          </Form> : <div>Cargando</div>}
      </Modal>

    </div>
  );
}

export default Productos;