import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List, Button, Badge } from 'antd-mobile'

const { Item, Brief } = List

import './Buy.css'

class BuyTab extends Component {
  componentDidMount() {
    setTimeout(() => this.props.getBuyList(), 500)
  }

  refreshData() {
    setTimeout(() => this.props.getBuyList(), 500)
  }


  render() {
    const { buyList } = this.props.exchange
    const { wecoinBalance } = this.props.user
    
    return(
      <div>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key={0} type="loading" onClick={() => this.refreshData().bind(this)} />,
          ]}
        >Buy Now</NavBar>
        <WingBlank>
          <WhiteSpace />
          <List renderHeader="" className="my-list">
            <Item extra={this.props.user.wecoinBalance + " WeCoin"} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
              {this.props.user.data.name} 
            </Item>
          </List>
          <WhiteSpace />
          <List>
            {buyList.map(i => (
              <Item
                key={i.id}
                thumb={i.merchant_icon}
                extra={<Button type="primary">Buy</Button>}
                onClick={() => {}}
                multipleLine
                wrap
              >{i.username}<br/>
                <span className="item-buy-amount">buys <strong>{i.buy_amount} {i.merchant_code} pts.</strong></span><br/>
                <span className="item-buy-price">Price: <strong>{i.buy_total_price} WeCoin</strong></span><br/>
              </Item>
            ))}
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default BuyTab
