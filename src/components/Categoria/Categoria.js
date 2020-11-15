import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const baseUrl = "http://localhost:3000/api/categoria";

function Categoria(){

  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'IdCategoria',
      key: 'id',
    },
    {
      title: 'Nombre de la categoria',
      dataIndex: 'NombreCategoria',
      key: 'nombre',
    },
    {
      title: 'Accion',
      key: 'accion',
      render: () => (
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

  const peticionGet = async() =>{
    await axios.get(baseUrl)
    .then(response =>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    });
  }

  useEffect(() =>{
    peticionGet();
  },[])

  return(
    <>  
    <Table rowKey="IdCategoria" columns={columns} dataSource={data}/>
    </>
  );
};

export default Categoria;