import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List, Button, Badge } from 'antd-mobile'

const { Item, Brief } = List

import './Sell.css'

class SellTab extends Component {
  componentDidMount() {
    this.props.getSellList()
  }

  render() {
    const { sellList } = this.props.exchange
    
    return(
      <WingBlank>
        <List renderHeader={() => 'Sell Now'}>
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
    )
  }
}

export default SellTab
