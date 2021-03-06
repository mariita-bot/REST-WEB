import { Modal, Button, Input, Row, Col, InputNumber, message, Select  } from 'antd';
import React, { useState, useEffect } from 'react';
import openNotification from '../Extra/Notification';



import { 
  insertarProveedorPost,
} from './Service';

const { Option } = Select;

const { TextArea } = Input;

function VentanaAgregarProveedor(props){

  const [ estadoModalAgregar, setestadoModalAgregar ] = useState({
    visible: false,
  });

  const [valoresProveedorNuevo, setValoresProveedorNuevo] = useState({
    NombreProveedor : "",
    Direccion : "", 
    Telefono : ""
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



  async function insertarProveedor () {
    await Promise.all([
      insertarProveedorPost(valoresProveedorNuevo),
    ]).then(responses => {
      
      openNotification("Notificación", "Proveedor agregado correctamente." , "success")
      handleCancel();
      //Reset default values
      setValoresProveedorNuevo({
        NombreCategoria : "",
      })

      props.actualizarProveedor();
      
    }).catch(error => {
      message.error(error.toString())
      openNotification("Alerta", "Error insertando el Proveedor, revise la consola para más detalles", "error"  )
    })
  }

  function onChangeNombreProveedor (e) {
    setValoresProveedorNuevo(prevState => ({...prevState, NombreProveedor: e.target.value}))
  }

  function onChangeDireccionProveedor (e) {
    setValoresProveedorNuevo(prevState => ({...prevState, Direccion: e.target.value}))
  }

  function onChangeTelefonoProveedor (e) {
    setValoresProveedorNuevo(prevState => ({...prevState, Telefono: e.target.value}))
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar Proveedor
      </Button>
      <br></br>
      <Modal
        title="Agregar Nuevo Proveedor"
        visible={estadoModalAgregar.visible}
        onOk={handleOk}
        width={1000}
        footer={null}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Nombre Proveedor </p>
            <Input value={valoresProveedorNuevo.NombreProveedor} onChange={onChangeNombreProveedor}  />
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Dirección del Proveedor </p>
            <Input value={valoresProveedorNuevo.Direccion} onChange={onChangeDireccionProveedor}  />
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Teléfono </p>
            <Input value={valoresProveedorNuevo.Telefono} onChange={onChangeTelefonoProveedor}  />
          </div>
     
        
          <center>
            <Button type="primary" onClick={insertarProveedor}>Agregar</Button>
          </center>
        </div>

      </Modal>
    </div>
  );
}

export default VentanaAgregarProveedor;