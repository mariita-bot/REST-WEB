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
  obtenerCategoriaGet
} from './Service';

import VentanaAgregarCategoria from './AgregarCategoria';

const layout={
  labelCol:{
    span:10
  },
  wrapperCol:{
    span :16
  }
}

function Categoria(){

  const [ categoriaTabla, setCategoriaTabla] = useState([]);
  const [ estadoModalEditar, setEstadoModalEditar ] = useState({
    visible: false,
    categoria: undefined,
  });

  const [tablaCargando , setTablaCargando ] = useState(false);

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
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title='Editar'>
            <Button 
              type='primary'
              onClick={ async () => {
                await Promise.all([
                  obtenerCategoriaPorId(record.IdCategoria),
                  obtenerCategoriaGet()
                ]).then(responses => {
                  setEstadoModalEditar({
                    visible: true,
                    categoria: responses[0].data
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

  const obtenerCategorias = async() =>{
    setTablaCargando (true);
    try {
      const response = await obtenerCategoriaGet();
      if (response.data){
        setTablaCargando(false);
        setCategoriaTabla(response.data)
      }
    } catch (error) {
      setTablaCargando(false);
      message.error(error.toString());
      
    }
  }

  const formFinish = (values) =>{
    console.log(values);
  }

  useEffect(() =>{
    obtenerCategorias();
  },[])

  return(
    <>
    <VentanaAgregarCategoria actualizarCategorias={obtenerCategorias} ></VentanaAgregarCategoria>  
    <Table loading={tablaCargando} rowKey="IdCategoria" columns={columns} dataSource={categoriaTabla}/>
    <Modal
      visible={estadoModalEditar.visible}
      title="Editar Categoria"
      maskClosable={false}
      onCancel={() => setEstadoModalEditar({visible: false, categoria: null})}
      footer={[
        <Button key='1'>Cancelar</Button>,
        <Button key='2' type='primary' htmlType="formularioCategoriaEditar">Guardar</Button>
      ]}
    >
    { estadoModalEditar.visible === true ? <Form 
      id="formularioCategoriaEditar" 
      {...layout}
      onFinish={(values) => formFinish(values)}
    >
      <Form.Item
        inicalValue = {setEstadoModalEditar.categoria} 
        name="NombreCategoria"
        label="Nombre de la categoria"
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

export default Categoria;