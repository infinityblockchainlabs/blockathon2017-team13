import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List, Button, Badge } from 'antd-mobile'

const { Item, Brief } = List

import './Sell.css'

class SellTab extends Component {
  componentDidMount() {
    setTimeout(() => this.props.getSellList(), 500)
  }

  refreshData() {
    setTimeout(() => this.props.getSellList(), 500)
  }

  render() {
    const { sellList } = this.props.exchange
    
    return(
      <div>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key={0} type="loading" onClick={() => this.refreshData().bind(this)} />,
          ]}
        >Sell Now</NavBar>
        <WingBlank>
          <WhiteSpace />
          <List renderHeader="" className="my-list">
            <Item extra={this.props.user.wecoinBalance + " WeCoin"} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
              {this.props.user.data.name} 
            </Item>
          </List>
          <WhiteSpace />
          <List>
            {sellList.map(i => (
              <Item
                key={i.id}
                thumb={i.merchant_icon}
                extra={<Button type="warning">Sell</Button>}
                onClick={() => {}}
                multipleLine
                wrap
              >{i.username}<br/>
                <span className="item-sell-amount">buys <strong>{i.sell_amount} {i.merchant_code} pts.</strong></span><br/>
                <span className="item-sell-price">Price: <strong>{i.sell_total_price} WeCoin</strong></span><br/>
              </Item>
            ))}
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default SellTab
