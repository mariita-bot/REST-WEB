import React from 'react';
import { Table, Tag, Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Proveedor(){
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nombre del proveedor',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Direccion',
      dataIndex: 'direccion',
      key: 'direccion',
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    {
      title: 'Accion',
      key: 'accion',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title='Editar'>
            <Button type='primary'><EditOutlined/></Button>
          </Tooltip>
          <Tooltip title='Eliminar'>
           <Button danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '1',
      nombre: 'Cervecera de Nicaragua S.A',
      direccion: 'Santo Tomas, Chontales',
      telefono: '222254879',
    },
    {
      key: '2',
      id: '2',
      nombre: 'Coca Cola',
      direccion: 'San Carlos, Rio San Juan',
      telefono: '22254515',
    },
    {
      key: '3',
      id: '3',
      nombre: 'Pepsi',
      direccion: 'San Carlos, Rio San Juan',
      telefono: '22251645',
    },
  ];
  return(
    <Table columns={columns} dataSource={data}/>
  );
};

export default Proveedor;