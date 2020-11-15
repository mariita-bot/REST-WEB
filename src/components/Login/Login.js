import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

  function Login(props){

  const login = () => {
    props.history.push("/dashboard/*")
  }

    return (
      <div style={{backgroundImage: 'url(./img/fondo.jpg)'}}>
        <Row className='bg' type='flex' align='middle' justify='center' style={{minHeight:'100vh'}}>
          <Col >
            <Card >
            <Form layout='vertical'>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Por favor ingresar su nombre de usuario!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor ingresar su contraseña!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Contraseña"
                />
              </Form.Item>
              <Form.Item>
                <Button onClick={login} style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
                  Iniciar Sesion
                </Button>
              </Form.Item>
            </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
export default Login;