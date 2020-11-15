import React from 'react';
import { useState } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { 
  Layout,
  Button, 
  Menu, 
  Dropdown, 
  message, 
  Tooltip 
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, 
  DownOutlined,
  SettingFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import Pedidos from '../Pedidos/Pedidos';
import Productos from '../Productos/Productos';
import Proveedor from '../Proveedor/Proveedor';
import Categoria from '../Categoria/Categoria';
import Mesero from '../Mesero/Mesero';
import Ventas from '../Ventas/Ventas';
import './Layout.css';


const { Header, Sider, Content } = Layout;

function MainLayout(props) {
  
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const salir = () => {
    props.history.push("/login")
  }

  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    if (parseInt(e.key) === 2) salir();
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<SettingFilled />}>
        Configuracion
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Salir
      </Menu.Item>
    </Menu>
  );
  
  return(
    <Layout>
      <Sider style={{height: '100vh'}} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/dashboard/pedidos" style={{ padding: 5 }}>
              Pedidos
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/dashboard/productos" style={{ padding: 5 }}>
              Productos
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/dashboard/proveedor" style={{ padding: 5 }}>
              Proveedor
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/dashboard/categoria" style={{ padding: 5 }}>
              Categoria
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/dashboard/mesero" style={{ padding: 5 }}>
              Mesero
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<VideoCameraOutlined />}>
            <Link to="/dashboard/ventas" style={{ padding: 5 }}>
              Ventas
            </Link>
          </Menu.Item>
          <Menu.Item onClick={salir} key="7" icon={<UploadOutlined />}>
            Salir
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <Dropdown.Button style={{float: 'right', margin: '15px',}} overlay={menu} placement="bottomCenter" icon={<UserOutlined />}/>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}>
            <Route exact path="/dashboard/*">{ <Redirect to="/dashboard/pedidos" />}</Route>
            <Route exact path="/dashboard/pedidos" component={Pedidos} />
            <Route exact path="/dashboard/productos" component={Productos} />
            <Route exact path="/dashboard/proveedor" component={Proveedor} />
            <Route exact path="/dashboard/categoria" component={Categoria} />
            <Route exact path="/dashboard/mesero" component={Mesero} />
            <Route exact path="/dashboard/ventas" component={Ventas} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;