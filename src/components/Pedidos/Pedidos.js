import React from 'react';
import { Table, Tag, Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Pedidos(){
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Observacion',
      dataIndex: 'observacion',
      key: 'observacion',
    },
    {
      title: 'Numero de mesa',
      dataIndex: 'numerodemesa',
      key: 'numerodemesa',
    },
    {
      title: 'Mesero',
      dataIndex: 'mesero',
      key: 'mesero',
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
      estado: 'En proceso',
      observacion: 'Cubiertos extras',
      numerodemesa: '1',
      mesero: 'Juan Ramirez'
    },
    {
      key: '2',
      id: '2',
      estado: 'Recibida',
      observacion: 'Cubiertos extras',
      numerodemesa: '2',
      mesero: 'Juan Ramirez'
    },
    {
      key: '3',
      id: '3',
      estado: 'En proceso',
      observacion: 'Cubiertos extras',
      numerodemesa: '3',
      mesero: 'Juan Ramirez'
    },
  ];
  return(
    <Table columns={columns} dataSource={data}/>
  );
};

export default Pedidos;