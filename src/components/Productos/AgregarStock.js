import { Modal, Button, Input, Row, Col, Table, InputNumber, message, Select  } from 'antd';
import React, { useState, useEffect } from 'react';
import openNotification from '../Extra/Notification';



import { 
  insertarProductoPost,
  obtenerCategoriasGet,
  obtenerProductoGet,
  obtenerProveedorGet,
  insertarStockProducto
} from './Service';

const { Option } = Select;

const { TextArea } = Input;



function VentanaAgregarStock(props){

  const columns = [
    {
      title: 'Nombre Producto',
      dataIndex: 'NombreProducto',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nombre Proveedor',
      dataIndex: 'NombreProveedor',
    },
    {
      title: 'Precio por unidad',
      dataIndex: 'PrecioEntrada',
    },
    {
      title: 'Observación',
      dataIndex: 'Observacion',
    },
    {
      title: 'Cantidad a agregar',
      dataIndex: 'Cantidad',
    },
  
  ];

  const [ estadoModalAgregar, setestadoModalAgregar ] = useState({
    visible: false,
  });

  const [ listaCategorias , setCategorias ] = useState ([]) ;
  const [ listaProveedor , setProveedor ] = useState ([]);
  const [ listaProductos , setProductos ] = useState([]);

  const [listaProductosAgregar, setProductosAgregar ] = useState ([]);

  const [valoresProductoNuevo, setValoresProductoNuevo] = useState({
    NombreProducto : "",
    IdProducto : 0,
    NombreProveedor : "",
    IdProveedor : 0,
    PrecioVenta : 0,
    Descripcion: "",
    Tamanio : "",
    Estado : true,
    IdCategoria : 1,
    MontoTotal : 0
  })

  function showModal () {
    loadCategories();
    loadProveedor();
    loadProductos();
    setestadoModalAgregar({visible: true})
  };

  async function loadProveedor() {

    await Promise.all([
      obtenerProveedorGet(),
    ]).then(responses => {
      setProveedor(responses[0].data)
      console.log(responses[0].data);
      //console.log(listaCategorias)
    }).catch(error => message.error(error.toString()))

  }

  async function loadProductos() {

    await Promise.all([
      obtenerProductoGet(),
    ]).then(responses => {
      setProductos(responses[0].data)
      console.log(responses[0].data);
    }).catch(error => message.error(error.toString()))

  }

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

  function onChangePrecioUnidad(value) {
    setValoresProductoNuevo(prevState => ({...prevState, PrecioEntrada: value}))
  }
  

  function handleChangeProducto(value) {

    var producto = listaProductos.find(t=> t.IdProducto === value);
    setValoresProductoNuevo(prevState => ({...prevState, IdProducto: value, NombreProducto : producto.NombreProducto }))
  }

  function handleChangeProveedor (value) {
    var proveedor = listaProveedor.find(t=> t.IdProveedor === value);
    setValoresProductoNuevo(prevState => ({...prevState, IdProveedor: value, NombreProveedor : proveedor.NombreProveedor }))

  }


  async function insertarProducto () {

    var nuevoProductoStock = Object();
    nuevoProductoStock.IdProducto = valoresProductoNuevo.IdProducto;
    nuevoProductoStock.PrecioEntrada = valoresProductoNuevo.PrecioEntrada;
    nuevoProductoStock.IdProveedor = valoresProductoNuevo.IdProveedor;
    nuevoProductoStock.Cantidad = valoresProductoNuevo.Cantidad;
    nuevoProductoStock.Observacion = valoresProductoNuevo.Observacion;
    nuevoProductoStock.NombreProducto = valoresProductoNuevo.NombreProducto;
    nuevoProductoStock.NombreProveedor = valoresProductoNuevo.NombreProveedor;
    nuevoProductoStock.MontoTotal = valoresProductoNuevo.Cantidad * valoresProductoNuevo.PrecioEntrada;

    setProductosAgregar([...listaProductosAgregar, nuevoProductoStock]);

  }

  function onChangeObservacion (e) {
    setValoresProductoNuevo(prevState => ({...prevState, Observacion: e.target.value}))
  }

  function onChangeCantidad(e) {
    //console.log(e);
    setValoresProductoNuevo(prevState => ({...prevState, Cantidad : e}))
  }

  async function insertarTodosLosProductos() {

    for await (const element of listaProductosAgregar ) {

      await Promise.all([
        insertarStockProducto(element),
      ]).then(responses => {

      }).catch(error => {
        message.error(error.toString())
        //openNotification("Alerta", "Error insertando el producto, revise la consola para más detalles", "error"  )
      })

    }

    openNotification("Notificación", "Stock agregado correctamente." , "success")
    handleCancel();
    setProductosAgregar ([]);
    setValoresProductoNuevo(  {
      NombreProducto : "",
      IdProducto : 0,
      NombreProveedor : "",
      IdProveedor : 0,
      PrecioVenta : 0,
      Descripcion: "",
      Tamanio : "",
      Estado : true,
      IdCategoria : 1,
      MontoTotal: 0
    });


  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar Stock a productos
      </Button>
      <br></br>
      <Modal
        title="Agregar Nuevo Stock a productos"
        visible={estadoModalAgregar.visible}
        onOk={handleOk}
        width={1200}
        footer={null}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div>

        <Row>
          <Col span={12} >

          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Seleccionar Producto  </p>
            <Select onChange={handleChangeProducto} style={{ width: 120 }} >
              {listaProductos?.map(function(d, idx){
                return (<Option key={d.IdProducto} value={d.IdProducto}>{d.NombreProducto}</Option>)
              })}
            </Select>
          </div>
     
          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Observación  </p>
            <TextArea value={valoresProductoNuevo.Observacion} rows={4} onChange={onChangeObservacion} />
          </div>

          <Row>
            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <p style={{fontSize: '12sp'}}> Precio por Unidad  </p>
                <InputNumber  value={valoresProductoNuevo.PrecioEntrada} onChange={onChangePrecioUnidad} />
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: 16 }}>
                <p style={{fontSize: '12sp'}}> Cantidad  </p>
                <InputNumber value={valoresProductoNuevo.Cantidad} onChange={onChangeCantidad} />
              </div>

            </Col>
          </Row>


          <div style={{ marginBottom: 16 }}>
            <p style={{fontSize: '12sp'}}> Proveedor  </p>
            <Select onChange={handleChangeProveedor} style={{ width: 120 }} >
              {listaProveedor?.map(function(d, idx){
                return (<Option key={d.IdProveedor} value={d.IdProveedor}>{d.NombreProveedor}</Option>)
              })}
            </Select>
          </div>

          <center>
            <Button type="primary" onClick={insertarProducto}>Agregar</Button>
          </center>

          </Col>

          <Col span={12} >

          <Table columns={columns} dataSource={listaProductosAgregar} />

          <center>
            <Button type="primary" onClick={insertarTodosLosProductos}>Agregar todos los productos</Button>
          </center>

          </Col>
        </Row>

       
        </div>

      </Modal>
    </div>
  );
}

export default VentanaAgregarStock;