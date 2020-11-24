import { Modal, Button, Input, Row, Col, Tooltip, Space, Table,
  Switch, InputNumber, message, Select,  
  Form,  } from 'antd';
import React, { useState, useEffect } from 'react';
import openNotification from '../Extra/Notification';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


import { 
  insertarPedidoPost,
  obtenerMesasGet,
  obtenerMeserosGet,
  obtenerProductosGet,
} from './Service';


const { Option } = Select;

const { TextArea } = Input;

const layout={
  labelCol:{
    span:10
  },
  wrapperCol:{
    span :16
  }
}



function VentanaAgregarPedido(props){

  const [ estadoModalAgregar, setestadoModalAgregar ] = useState({
    visible: false,
  });

  const [ productosTabla, setProductosTabla] = useState([]);

  const [ meserosLista , setMeserosLista ] = useState ([]);

  const [ productoSelected , setProductoSelected ] = useState ({});

  const [ cantidadProductoSelected , setCantidadProductoSelected ] = useState (1);

  const [ productosLista , setProductosLista ] = useState ([]);

  const [ mesasLista , setMesasLista ] = useState ([]);

  const [subtotal, setSubtotal ] = useState (0);

  const [iva , setIva ] = useState(0);

  const [total, setTotal ] = useState (0);

  const [valoresPedidoNuevo, setValoresPedidoNuevo] = useState({
    NombreCategoria : "",
  })

  function showModal () {
    setestadoModalAgregar({visible: true});
    llenarDatos();
  };

  function handleOk (e) {
    console.log(e);
  };

  function handleCancel (e) {
    setestadoModalAgregar({visible: false})
    setProductosTabla([]);
    setCantidadProductoSelected(0);
  };

  function calculateTotal () {

    var subtotal = 0;

    productosTabla.forEach(element => {
      subtotal = subtotal + (element.PrecioVenta * element.Cantidad) ;
    });

    setSubtotal (subtotal);

    setIva (subtotal * 0.15);

    setTotal ( subtotal + (subtotal * 0.15) );


  }

  const columnsProducts = [
    {
      title: 'ID',
      dataIndex: 'IdProducto',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Nombre Producto',
      dataIndex: 'NombreProducto',
    },
    {
      title: 'Cantidad',
      dataIndex: 'Cantidad',
    },
    {
      title: 'Precio x unidad',
      dataIndex: 'PrecioVenta'
    },
    {
      title: 'Accion',
      key: 'accion',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title='Eliminar'>
           <Button onClick={ () => { borrarDeTablaProducto(record) } } danger><DeleteOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    
    calculateTotal();
  }, [productosTabla]);


  function borrarDeTablaProducto (product) {
    setProductosTabla(productosTabla.filter(item => item.IdProducto !== product.IdProducto ));
    //calculateTotal();
  }

  async function llenarDatos () { 

    await Promise.all([
      obtenerMeserosGet(),
      obtenerMesasGet(),
      obtenerProductosGet()
    ]).then(responses => {
      setMesasLista(responses[1].data);
      setMeserosLista(responses[0].data);
      setProductosLista(responses[2].data) 
      
    }).catch(error => {
      message.error(error.toString() )
      openNotification("Eliminado Fallado", "La categoría no fue borrada correctamente, intente nuevamente", "error")
    })


  }



  async function formFinish (values) {
    console.log(values);

    values.productos = productosTabla;

    await Promise.all([
      insertarPedidoPost ( values),
    ]).then(responses => {

      console.log(responses);

      openNotification("Notificación", "Pedido agregado correctamente." , "success")

      setestadoModalAgregar({
        visible: false, 
        pedido: undefined,
      })

      props.obtenerPedidos();
      
    }).catch(error => {
      message.error(error.toString())
      console.log(error.toString());
      openNotification("Alerta", "Error agregando el pedido, revise la consola para más detalles", "error"  )
    })

  }


  async function insertarPedido () {
    try {
      const responses = await insertarPedidoPost(valoresPedidoNuevo);

      if (responses) {

        openNotification("Notificación", "Pedido agregado correctamente." , "success")
        handleCancel();
        //Reset default values
        setValoresPedidoNuevo({
          NombrePedido : "",
        })
  
        await updateTableParent();

      }



    }catch (error) {
      message.error(error.toString())
      openNotification("Alerta", "Error insertando el pedido, revise la consola para más detalles", "error"  )
    }

  }

  async function updateTableParent() {
    await props.actualizarPedidos();
  }

  function onChangeNombreCategoria (e) {
    setValoresPedidoNuevo(prevState => ({...prevState, NombreCategoria: e.target.value}))
  }

  function handleChangeProductoSelected (value) {
    setProductoSelected(value);
  }

  function handleChangeCantidadProductoSelected (value) {
    setCantidadProductoSelected(value);
  }

  function handleInsertarProductoSelected () {

    console.log(productoSelected);

    var newValue = new Object();
    var productoDetalle = productosLista.find( product => product.IdProducto === productoSelected );
    newValue.IdProducto = productoDetalle.IdProducto;
    newValue.NombreProducto = productoDetalle.NombreProducto;
    newValue.Cantidad = cantidadProductoSelected;
    newValue.PrecioVenta = productoDetalle.PrecioVenta;

    //console.log(newValue);

    if ( productosTabla.find(v => (v.IdProducto === newValue.IdProducto )  ) !== undefined  ) {

      const newClicks = [...productosTabla];
      
      const index = productosTabla.findIndex(element => element.IdProducto === newValue.IdProducto);

      const old = newClicks[index];
      const updated = { ...old }
      updated.Cantidad = updated.Cantidad + cantidadProductoSelected;
      const clone = [...productosTabla];
      clone[index] = updated;
      setProductosTabla(clone);

    } else {
      setProductosTabla (productosTabla.concat(newValue));

      console.log("im here creando nuevo");
    }

    //calculateTotal();
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Agregar nuevo Pedido
      </Button>
      <br></br>
      <Modal
        title="Agregar Nuevo Pedido"
        visible={estadoModalAgregar.visible}
        onOk={handleOk}
        footer={null}
        width={800}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <div>

          <Form 
            id="formularioPedidoNuevo" 
            {...layout}
            onFinish={(values) => formFinish(values)}
          >
            <Form.Item
              name="NombreCliente"
              label="Nombre del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="TelefonoCliente"
              label="Teléfono del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="CedulaCliente"
              label="Cedula del Cliente"
              required tooltip="Este es un campo requerido"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            
            <Form.Item
              name="Observacion"
              label="Observacion / detalle"
              rules={[
                {required: true}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item name="NumMesa" label="Numero mesa">
              <Select>
                {mesasLista?.map(function(d, idx){
                  return (<Select.Option key={d.IdMesa} value={d.IdMesa}>N# {d.Numero}</Select.Option>)
                })}
              </Select>
            </Form.Item>

            <Form.Item name="Mesero" label="Mesero">
              <Select>
                {meserosLista?.map(function(d, idx){
                  return (<Select.Option key={d.IdEmpleado} value={d.IdEmpleado}>{d.NombreEmpleado}</Select.Option>)
                })}

              </Select>
            </Form.Item>

            <Form.Item label="Ya pagado?" name="Pagado">
              < Switch />
            </Form.Item>

            <label> Productos </label>

            <Form.Item label="Elegir producto">
              <Select value={productoSelected.IdProducto} onChange={handleChangeProductoSelected}>
                {productosLista?.map(function(d, idx){
                  return (<Select.Option key={d.IdProducto} value={d.IdProducto}>{d.NombreProducto}</Select.Option>)
                })}

              </Select>
              
              <label>Cantidad </label>
              <InputNumber defaultValue={1} min={1} max={10} value={cantidadProductoSelected} onChange={handleChangeCantidadProductoSelected} />
                
              <Button type='primary' onClick={handleInsertarProductoSelected}> Insertar </Button>
            </Form.Item>

            <Table columns={columnsProducts} dataSource={productosTabla} ></Table>

            </Form>

          <label> Subtotal : {subtotal.toFixed(2)} </label> <br/>
          <label> Iva : {iva.toFixed(2)} </label>      <br/>
          <label>Total : {total.toFixed(2)} </label><br/>

          <center>
            <Button type='primary' htmlType="submit" form="formularioPedidoNuevo">Guardar</Button>
          </center>
        </div>

      </Modal>
    </div>
  );
}

export default VentanaAgregarPedido;