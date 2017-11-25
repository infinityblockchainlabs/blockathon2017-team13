import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import {NavBar, WingBlank, WhiteSpace, Icon, List, Button, Badge, Card} from 'antd-mobile'

const {Item, Brief} = List

import './Buy.css'

class BuyTab extends Component {
  componentDidMount() {
    setTimeout(() => this.props.getBuyList(), 500)
  }

  refreshData() {
    setTimeout(() => this.props.getBuyList(), 500)
  }


  render() {
    const {buyList} = this.props.exchange

    return (
      <div>
        <NavBar
          mode="dark"
          rightContent={[
            <img src="/images/synchronize-3.svg" alt="" onClick={() => this.refreshData().bind(this)}/>,
          ]}
        >Buy Now</NavBar>
        <WingBlank>
          <WhiteSpace />
          <div className="wecoin">
            <span>{this.props.user.wecoinBalance}</span> WeCoin
          </div>
          <WhiteSpace />
          {buyList && buyList.length > 0 && <List>
            {buyList.map(i => (
              <Item style={{fontSize: 14}}
                    key={i.id}
                // thumb={i.merchant_icon}
                    extra={<Button type="primary" style={{width: 70, float: 'right'}}>Buy</Button>}
                    onClick={() => this.props.buyOffer(i.id)}
                    multipleLine
                    wrap>
                <span style={{fontSize: 12, color: 'gray'}}><strong>{i.username}</strong> wants to sell</span><br/>
                <span className="item-buy-amount"><strong>{i.buy_amount} {i.merchant_code}</strong> points</span><br/>
                <span className="item-buy-price">for <strong>{i.buy_total_price} WeCoin</strong></span>
              </Item>
            ))}
          </List>
          }
        </WingBlank>
      </div>
    )
  }
}

export default BuyTab
