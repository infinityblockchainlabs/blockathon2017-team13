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
          rightContent={[
            <img src="/images/synchronize-3.svg" alt="" onClick={() => this.refreshData().bind(this)}/>,
          ]}
        >Advertisement</NavBar>
        <WingBlank>
          <WhiteSpace />
          <div className="wecoin">
            <span>{this.props.user.wecoinBalance}</span> WeCoin</div>
          <WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}

export default AdvertiseTab
