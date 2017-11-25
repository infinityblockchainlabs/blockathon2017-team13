import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, List, Button, Badge } from 'antd-mobile'
const { Item } = List

class AdvertiseTab extends Component {
  render() {
    return(
      <div>
        <NavBar
          mode="dark"
        >Advertisement</NavBar>
        <WingBlank>
          <WhiteSpace />
          <List renderHeader="" className="my-list">
            <Item extra={this.props.user.wecoinBalance + " WeCoin"} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
              {this.props.user.data.name}
            </Item>
          </List>
          <WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}

export default AdvertiseTab
