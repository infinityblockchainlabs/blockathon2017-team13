import React, {Component} from 'react'
import {Link}from 'react-router'
import {Layout, Menu, Input, Icon, Form} from 'antd'
const {Header, Content, Footer} = Layout
const FormItem = Form.Item;

import 'antd/dist/antd.css'
import '../App.css'
import './merchant.css'

class MerchantDemo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 1
    }
  }

  render() {
    return (
      <Layout>
        <Header style={{position: 'fixed', width: '100%', zIndex: 999}}>
          <div className="logo">
            <p>Awesome Store</p>
          </div>
          {/*<Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.selectedTab]}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1">
              <Link to="/merchant">Product List</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/merchant/cart">Shopping Cart</Link></Menu.Item>
            <Input style={{width: 400, marginLeft: 10}} prefix={<Icon type="search" style={{fontSize: 13}}/>}
                   placeholder="Search products..."/>
          </Menu>*/}
        </Header>
        <Content style={{padding: '0 50px', marginTop: 64}}>
          {this.props.children}
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Awesome Store ©2017
        </Footer>
      </Layout>
    )
  }
}

export default MerchantDemo