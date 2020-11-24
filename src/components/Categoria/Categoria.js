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
  obtenerCategoriaGet,
  borrarCategoriaDelete,
  editarCategoriaPut
} from './Service';

import openNotification from '../Extra/Notification';
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
                  //console.log(responses[0].data)
                }).catch(error => message.error(error.toString()))
              }}
            >
              <EditOutlined/>
            </Button>
          </Tooltip>
          <Tooltip title='Eliminar'>
            <Button onClick={ async () => { borrarCategoria(record) } } danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];


  function borrarCategoria ( categoria ) {
    Modal.confirm({
      title: 'Confirmación',
     
      content: '¿Estás seguro de borrar la categoria ' + categoria.NombreCategoria ,
      okText: 'Aceptar',
      cancelText: 'Cancelar',
      onOk: () => { borrarCategoriaDB(categoria) } 
    });
  }

  async function borrarCategoriaDB (categoria) {

    setTablaCargando(true);

    await Promise.all([
      borrarCategoriaDelete (categoria.IdCategoria)
    ]).then(responses => {
      setTablaCargando(false)
      openNotification("Eliminado", "Categoria eliminada correctamente", "success")
      obtenerCategorias();
    }).catch(error => {
      message.error(error.toString() )
      openNotification("Eliminado Fallado", "La categoría no fue borrada correctamente, intente nuevamente", "error")
      setTablaCargando(false)
    })

  }

  const obtenerCategorias = async() =>{
    //console.log("im here");
    try {
      setTablaCargando (true);
      const response = await obtenerCategoriaGet();

      if (response.data){

        console.log(response.data);

        setCategoriaTabla(response.data)
        setTablaCargando(false);
      }
    } catch (error) {
      setTablaCargando(false);
      message.error(error.toString());
      
    }
  }

  async function formFinish (values) {
    console.log(values);

    await Promise.all([
      editarCategoriaPut ( estadoModalEditar.categoria.IdCategoria , values),
    ]).then(responses => {

      console.log(responses);

      openNotification("Notificación", "Categoria editada correctamente." , "success")

      setEstadoModalEditar({
        visible: false, 
        categoria: undefined,
      })

      obtenerCategorias();
      
    }).catch(error => {
      message.error(error.toString())
      console.log(error.toString());
      openNotification("Alerta", "Error editando la Categoria, revise la consola para más detalles", "error"  )
    })


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
        <Button key='2' type='primary' htmlType="submit" form="formularioCategoriaEditar">Guardar</Button>
      ]}
    >
    { estadoModalEditar.visible === true ? <Form 
      id="formularioCategoriaEditar" 
      {...layout}
      onFinish={(values) => formFinish(values)}
    >
      <Form.Item
        initialValue = {estadoModalEditar.categoria?.NombreCategoria} 
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