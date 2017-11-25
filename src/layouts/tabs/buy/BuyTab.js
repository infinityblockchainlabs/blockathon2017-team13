import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List, Button, ActivityIndicator } from 'antd-mobile'

const {Item, Brief} = List

import './Buy.css'

class BuyTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    setTimeout(() => this.props.getBuyList(), 500)
  }

  refreshData() {
    setTimeout(() => this.props.getBuyList(), 500)
  }

  handleBuyItemClick(id) {
    this.props.buyOffer(id)
    // TODO Hide loading after transaction finished
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
      this.refreshData()
    }, 3000)
  }

  render() {
    const {buyList} = this.props.exchange

    return (
      <div>
        <NavBar
          mode="dark"
          rightContent={[
            <Icon key={0} type="loading" onClick={() => this.refreshData()} />,
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
              <Item
                key={i.id}
                thumb={i.merchant_icon}
                extra={<Button type="primary">Buy</Button>}
                onClick={() => this.handleBuyItemClick(i.id)}
                multipleLine
                wrap
              >{i.username}<br/>
                <span className="item-buy-amount">buys <strong>{i.buy_amount} {i.merchant_code}
                  pts.</strong></span><br/>
                <span className="item-buy-price">Price: <strong>{i.buy_total_price} WeCoin</strong></span><br/>
              </Item>
            ))}
          </List>
          }
          <ActivityIndicator
            toast
            text="Loading..."
            animating={this.state.loading}
          />
        </WingBlank>

      </div>
    )
  }
}

export default BuyTab
