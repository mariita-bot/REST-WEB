import React from 'react';
import { Table, Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Mesero(){
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nombre del mesero',
      dataIndex: 'nombre',
      key: 'nombre',
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
      nombre: 'Juan Ramirez',
    },
    {
      key: '2',
      id: '2',
      nombre: 'Martha Sanchez',
    },
  ];
  return(
    <Table columns={columns} dataSource={data}/>
  );
};

export default Mesero;