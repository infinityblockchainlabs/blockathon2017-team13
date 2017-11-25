import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

import 'antd/dist/antd.css'
import '../App.css'

class MerchanDemo extends Component {
  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Products</Menu.Item>
            <Menu.Item key="2">Your Profile</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Lezede ©2017
        </Footer>
      </Layout>
    )
  }
}

export default MerchanDemo