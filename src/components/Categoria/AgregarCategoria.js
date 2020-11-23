import { Modal, Button, Input, Row, Col, InputNumber, message, Select  } from 'antd';
import React, { useState, useEffect } from 'react';
import openNotification from '../Extra/Notification';



import { 
  insertarCategoriaPost,
} from './Service';

const { Option } = Select;

const { TextArea } = Input;

function VentanaAgregarCategoria(props){

  const [ estadoModalAgregar, setestadoModalAgregar ] = useState({
    visible: false,
  });

  const [valoresCategoriaNuevo, setValoresCategoriaNuevo] = useState({
    NombreCategoria : "",
  })

  function showModal () {
    setestadoModalAgregar({visible: true})
  };

  function handleOk (e) {
    console.log(e);
  };

  function handleCancel (e) {
    setestadoModalAgregar({visible: false})
  };



  async function insertarCategoria () {
    await Promise.all([
      insertarCategoriaPost(valoresCategoriaNuevo),
    ]).then(responses => {
      
      openNotification("Notificación", "Categoría agregada correctamente." , "success")
      handleCancel();
      //Reset default values
      setValoresCategoriaNuevo({
        NombreCategoria : "",
      })

      props.actualizarCategorias();
      
    }).catch(error => {
      message.error(error.toString())
      openNotification("Alerta", "Error insertando la Categoria, revise la consola para más detalles", "error"  )
    })
  }

  function onChangeNombreCategoria (e) {
    setValoresCategoriaNuevo(prevState => ({...prevState, NombreCategoria: e.target.value}))
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar Categoría
      </Button>
      <br></br>
      <Modal
        title="Agregar Nueva Categoría"
        visible={estadoModalAgregar.visible}
        onOk={handleOk}
        width={1000}
        footer={null}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Nombre Categoría  </p>
            <Input value={valoresCategoriaNuevo.NombreCategoria} onChange={onChangeNombreCategoria}  />
          </div>
     
        
          <center>
            <Button type="primary" onClick={insertarCategoria}>Agregar</Button>
          </center>
        </div>

      </Modal>
    </div>
  );
}

export default VentanaAgregarCategoria;