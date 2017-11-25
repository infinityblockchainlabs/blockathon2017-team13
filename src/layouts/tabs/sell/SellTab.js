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
            <img src="/images/synchronize-3.svg" alt="" onClick={() => this.refreshData().bind(this)}/>,
          ]}
        >Sell Now</NavBar>
        <WingBlank>
          <WhiteSpace />
          <div className="wecoin">
            <span>{this.props.user.wecoinBalance}</span> WeCoin</div>
          <WhiteSpace />
          <List>
            {sellList.map(i => (
              <Item
                key={i.id}
                // thumb={i.merchant_icon}
                extra={<Button type="warning" inline style={{width: 70, float: 'right'}}>Sell</Button>}
                onClick={() => this.props.sellOffer(i.id)}
                multipleLine
                wrap>
                <span style={{fontSize: 12, color: 'gray'}}><strong>{i.username}</strong> wants to buy</span><br/>
                <span className="item-sell-amount"><strong>{i.sell_amount} {i.merchant_code}</strong> points</span><br/>
                <span className="item-sell-price">with <strong>{i.sell_total_price} WeCoin</strong></span>
              </Item>
            ))}
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default SellTab
