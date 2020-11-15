import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  AutoComplete, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Space
 } from 'antd';

const { Search } = Input;

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
  
const searchResult = query =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((item, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        // label: (
        //   // <div
        //   //   style={{
        //   //     display: 'flex',
        //   //     justifyContent: 'space-between',
        //   //   }}
        //   // >
        //   //   <span>
        //   //     Found {query} on{' '}
        //   //     <a
        //   //       href={`https://s.taobao.com/search?q=${query}`}
        //   //       target="_blank"
        //   //       rel="noopener noreferrer"
        //   //     >
        //   //       {category}
        //   //     </a>
        //   //   </span>
        //   //   <span>{getRandomInt(200, 100)} results</span>
        //   // </div>
        // ),
      };
    });

function Ventas() {
  
  const [options, setOptions] = useState([]);
  
  const handleSearch = value => {
    setOptions(value ? searchResult(value) : []);
  };
  
    const onSelect = value => {
      console.log('onSelect', value);
    };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
              width: 300,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}>
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete>
        </Col>
        <Col style={{display: 'flex', justifyContent: 'flex-end', }} className="gutter-row" span={6} offset={12}>
            <Button type="primary" style={{marginRight: '3px'}} >Agregar</Button>
            <Button type="primary">Facturar</Button>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          
        </Col>
      </Row>
    </>
  );
}

export default Ventas;