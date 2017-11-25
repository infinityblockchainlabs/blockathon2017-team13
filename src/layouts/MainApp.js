import React, { Component } from 'react'

import { TabBar } from 'antd-mobile'
import AccountTabContainer from './tabs/account/AccountTabContainer'
import BuyTabContainer from './tabs/buy/BuyTabContainer'
import SellTabContainer from './tabs/sell/SellTabContainer'
import AdvertiseTabContainer from './tabs/advertise/AdvertiseTabContainer'

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'accountTab',
    };
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="Account"
              key="Account"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(/images/account-circle-1.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(/images/account-circle-1-fill.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 'accountTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'accountTab',
                });
              }}
            >
              <AccountTabContainer />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(/images/shopping-cart-down.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(/images/shopping-cart-down-fill.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="Buy"
              key="Buy"
              selected={this.state.selectedTab === 'buyTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'buyTab',
                });
              }}
            >
              <BuyTabContainer />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(/images/shopping-cart-up.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(/images/shopping-cart-up-fill.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="Sell"
              key="Sell"
              selected={this.state.selectedTab === 'sellTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'sellTab',
                });
              }}
            >
              <SellTabContainer />
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: '/images/megaphone-1.svg' }}
              selectedIcon={{ uri: '/images/megaphone-1-fill.svg' }}
              title="Advertise"
              key="Advertise"
              selected={this.state.selectedTab === 'advertiseTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'advertiseTab',
                });
              }}
            >
              <AdvertiseTabContainer />
            </TabBar.Item>
          </TabBar>
      </div>
    )
  }
}

export default MainApp