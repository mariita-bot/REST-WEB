import React, { useEffect, useState } from 'react';
import { Card, message, Switch } from 'antd';
import { obtenerMesasGet, cambiarEstadoDeMesa } from './Service';
import './Style.css';

function Mesas() {
  const [ mesaGrid, setMesaGrid ] = useState([]);

  const obtenerMesas = async() =>{
    try {
      const response = await obtenerMesasGet();
      if (response.data){
        console.log(response.data)
        setMesaGrid(response.data)
      }
    } catch (error) {
      message.error(error.toString());
    }
  }

  const cambiarEstadoMesa = async(checked, mesaGridIdmesa) => {
    try {
      const body = {IdMesa: mesaGridIdmesa, Estado: checked}
      const response = await cambiarEstadoDeMesa(body);
      if (response.data){
        obtenerMesas();
      }
    } catch (error) {
      message.error(error.toString());
    }
  }

  useEffect(() =>{
    obtenerMesas();
  },[mesaGrid])

  return(
    <Card title="Mesas">
      {mesaGrid.map((mesaGrid, index) =>{
        return(
          <Card.Grid key={index} 
            style={{
              width: '25%',
              textAlign: 'center',
              background: mesaGrid.Estado === 0 ?  '#ef9a9a' : '#90CAF9',
            }}
          >
            <div className="textoMesa">
              {`M${mesaGrid.Numero}`}
            </div>
            <Switch checked={mesaGrid.Estado === 0 ? false : true} onChange={(checked) => cambiarEstadoMesa(checked, mesaGrid.IdMesa)} />
          </Card.Grid>
        );
      })}
    </Card>
  );
}

// <Card title="Card Title">
// <Card.Grid style={gridStyle}>Content</Card.Grid>
// <Card.Grid style={gridStyle}>
//   Content
// </Card.Grid>
// <Card.Grid style={gridStyle}>Content</Card.Grid>
// <Card.Grid style={gridStyle}>Content</Card.Grid>
// <Card.Grid style={gridStyle}>Content</Card.Grid>
// <Card.Grid style={gridStyle}>Content</Card.Grid>
// </Card>

export default Mesas;