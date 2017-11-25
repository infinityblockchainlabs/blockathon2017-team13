import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { NavBar, WingBlank, WhiteSpace, Icon, List, Button, Modal } from 'antd-mobile'
import LogoutButton from '../../../ui/logoutbutton/LogoutButtonContainer'

const { Item, Brief } = List

class AccountTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalCoinIncrement: false
    }
  }

  componentDidMount() {
    this.refreshData()
  }

  showModal (key) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [key]: true,
      });
    }
  }

  onClose (key) {
    return () => {
      this.setState({
        [key]: false,
      });
    }
  }

  refreshData() {
    setTimeout(() => {
      this.props.getAccountInfo()
      this.props.getMerchants()
    }, 500)
  }

  render() {
    return(
      <div>
        <NavBar
          mode="dark"
          rightContent={<Icon type="loading" onClick={() => this.refreshData().bind(this)} />}
        >Account</NavBar>
        <WingBlank>
          <List renderHeader="" className="my-list">
            <Item extra={this.props.wecoinBalance + " WeCoin"} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
              {this.props.data.name} 
            </Item>
          </List>
          <WhiteSpace />
          <List renderHeader='Collected Points' className="point-list">
            {this.props.merchants.map((m) => {
              return (
                <Item extra={m.points} key={m.name}>{m.name}</Item>
              )
            })}
            
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.showModal('modalCoinIncrement')}>Link new site</Button>
          <WhiteSpace />
          <LogoutButton />

          <Modal
            popup
            visible={this.state.modalCoinIncrement}
            maskClosable={false}
            animationType="slide-up"
          >
            <List renderHeader={() => <div>Information</div>} className="popup-list">
              <List.Item multipleLine={true}>You have 10 points more from Lezede</List.Item>
              <List.Item>
                <Button type="primary" onClick={this.onClose('modalCoinIncrement').bind(this)}>Ok</Button>
              </List.Item>
            </List>
          </Modal>
        </WingBlank>
      </div>
    )
  }
}

export default AccountTab
