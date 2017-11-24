import React, { Component } from 'react'

import { TabBar } from 'antd-mobile'
import AccountTab from './tabs/AccountTab'
import BuyTab from './tabs/BuyTab'
import SellTab from './tabs/SellTab'
import AdvertiseTab from './tabs/AdvertiseTab'

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
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 'accountTab'}
              badge={1}
              onPress={() => {
                this.setState({
                  selectedTab: 'accountTab',
                });
              }}
            >
              <AccountTab />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="Buy"
              key="Buy"
              badge={'new'}
              selected={this.state.selectedTab === 'buyTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'buyTab',
                });
              }}
            >
              <BuyTab />
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="Sell"
              key="Sell"
              dot
              selected={this.state.selectedTab === 'sellTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'sellTab',
                });
              }}
            >
              <SellTab />
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
              selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
              title="Advertise"
              key="Advertise"
              selected={this.state.selectedTab === 'advertiseTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'advertiseTab',
                });
              }}
            >
              <AdvertiseTab />
            </TabBar.Item>
          </TabBar>
      </div>
    )
  }
}

export default MainApp