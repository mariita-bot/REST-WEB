import { Modal, Button, Input, Row, Col, InputNumber, message, Select  } from 'antd';
import React, { useState, useEffect } from 'react';
import openNotification from '../Extra/Notification';



import { 
  insertarProductoPost,
  obtenerCategoriasGet
} from './Service';

const { Option } = Select;

const { TextArea } = Input;

function VentanaAgregarProductos(props){

  const [ estadoModalAgregar, setestadoModalAgregar ] = useState({
    visible: false,
  });

  const [ listaCategorias , setCategorias ] = useState ([]) 

  const [valoresProductoNuevo, setValoresProductoNuevo] = useState({
    NombreProducto : "",
    PrecioVenta : 0,
    Descripcion: "",
    Tamanio : "",
    Estado : true,
    IdCategoria : 1
  })

  function showModal () {
    loadCategories();
    setestadoModalAgregar({visible: true})
  };

  async function loadCategories() {

    await Promise.all([
      obtenerCategoriasGet(),
    ]).then(responses => {
      setCategorias(responses[0].data)
      console.log(responses[0].data);
      //console.log(listaCategorias)
    }).catch(error => message.error(error.toString()))

  }

  function handleOk (e) {
    console.log(e);
  };

  function handleCancel (e) {
    setestadoModalAgregar({visible: false})
  };

  function onChangePrecioVenta(value) {
    setValoresProductoNuevo(prevState => ({...prevState, PrecioVenta: value}))
  }
  
  function onChangeTamañoProducto(value) {
    setValoresProductoNuevo(prevState => ({...prevState, Tamanio: value}))
  }

  function handleChangeCategoria(value) {
    setValoresProductoNuevo(prevState => ({...prevState, IdCategoria: value}))
  }

  async function insertarProducto () {
    await Promise.all([
      insertarProductoPost(valoresProductoNuevo),
    ]).then(responses => {
      
      openNotification("Notificación", "Producto agregado correctamente." , "success")
      handleCancel();
      //Reset default values
      setValoresProductoNuevo({
        NombreProducto : "",
        PrecioVenta : 0,
        Descripcion: "",
        Tamanio : "",
        Estado : true,
        IdCategoria : 1
      })

      props.actualizarProductos();
      
    }).catch(error => {
      message.error(error.toString())
      openNotification("Alerta", "Error insertando el producto, revise la consola para más detalles", "error"  )
    })
  }

  function onChangeNombreProducto (e) {
    setValoresProductoNuevo(prevState => ({...prevState, NombreProducto: e.target.value}))
  }

  function onChangeDescripcionProducto (e) {
    setValoresProductoNuevo(prevState => ({...prevState, Descripcion: e.target.value}))
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar Producto
      </Button>
      <br></br>
      <Modal
        title="Agregar Nuevo Producto"
        visible={estadoModalAgregar.visible}
        onOk={handleOk}
        width={1000}
        footer={null}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Nombre Producto  </p>
            <Input value={valoresProductoNuevo.NombreProducto} onChange={onChangeNombreProducto}  />
          </div>
     
          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Descripción  </p>
            <TextArea value={valoresProductoNuevo.Descripcion} rows={4} onChange={onChangeDescripcionProducto} />
          </div>

          <Row>
            <Col span={4}>
              <div style={{ marginBottom: 16 }}>
                <p style={{fontSize: '12sp'}}> Precio Venta  </p>
                <InputNumber min={1} value={valoresProductoNuevo.PrecioVenta} onChange={onChangePrecioVenta} />
              </div>
            </Col>
            <Col span={4}>
              <div style={{ marginBottom: 16 }}>
                <p style={{fontSize: '12sp'}}> Tamaño  </p>
                <InputNumber min={1} value={valoresProductoNuevo.Tamanio} onChange={onChangeTamañoProducto} />
              </div>

            </Col>
          </Row>

          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Categoria  </p>
            <Select onChange={handleChangeCategoria} style={{ width: 120 }} >
              {listaCategorias?.map(function(d, idx){
                return (<Option key={d.IdCategoria} value={d.IdCategoria}>{d.NombreCategoria}</Option>)
              })}
            </Select>
          </div>

          <center>
            <Button type="primary" onClick={insertarProducto}>Agregar</Button>
          </center>
        </div>

      </Modal>
    </div>
  );
}

export default VentanaAgregarProductos;