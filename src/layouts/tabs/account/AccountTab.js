import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import {NavBar, WingBlank, WhiteSpace, Icon, List, Button, Modal, Card} from 'antd-mobile'
import LogoutButton from '../../../ui/logoutbutton/LogoutButtonContainer'
import './account.css'
const {Item, Brief} = List

class AccountTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalCoinIncrement: false,
      modalLogOut: false
    }
  }

  componentDidMount() {
    setTimeout(() => this.refreshData(), 500)
  }

  refreshData() {
    this.props.getAccountInfo()
    this.props.getMerchants()
  }

  showModal(key) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [key]: true,
      });
    }
  }

  onClose(key) {
    return () => {
      this.setState({
        [key]: false,
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          rightContent={<Icon type="loading" onClick={() => this.refreshData()}/>}
        >Account</NavBar>
        <WingBlank>
          <WhiteSpace />
          <Card>
            <Card.Header
              title={this.props.data.name}
              thumb={<img src="/images/avatar.png" width="80px" alt="" />}
              extra={<img src="/images/logout-2.svg" alt="" onClick={this.showModal('modalLogOut')}/>}
            />
            <Card.Body>
              <div style={{textAlign: 'center', fontSize: 16}}>
                <span style={{color: 'red'}}>{this.props.wecoinBalance}</span><span> WeCoin</span></div>
            </Card.Body>
          </Card>
          <WhiteSpace />
          <List className="point-list">
            <Item extra={<Button size="small" type="ghost"
                                 onClick={this.showModal('modalCoinIncrement')}
                                 icon={<img src="/images/link-3.svg" alt="" />}
                                 style={{width: 90, float: 'right'}}>Add</Button>} key={'header'}>
              <span style={{fontSize: 18, fontWeight: 600}}>Collected Points</span>
            </Item>
            {this.props.merchants.map((m, index) => {
              return (
                <Item extra={m.points + ' pts'} key={index}
                  arrow="horizontal"
                  onClick={() => browserHistory.push('/redeem')}>{m.name}</Item>
              )
            })}

          </List>
          <WhiteSpace />

          <Modal
            popup
            visible={this.state.modalCoinIncrement}
            maskClosable={false}
            animationType="slide-up"
          >
            <List renderHeader={() => <div>Information</div>} className="popup-list">
              <List.Item key={1} multipleLine={true}>Place holder</List.Item>
              <List.Item key={2}>
                <Button type="primary" onClick={() => this.onClose('modalCoinIncrement')}>OK</Button>
              </List.Item>
            </List>
          </Modal>

          <Modal
            popup
            visible={this.state.modalLogOut}
            maskClosable={false}
            animationType="slide-up"
          >
            <List renderHeader={() => <div>Log Out?</div>} className="popup-list">
              <List.Item key={1} multipleLine={true}>
                <Button type="default" onClick={this.onClose('modalLogOut')}>Cancel</Button>
              </List.Item>
              <List.Item key={2}>
                <LogoutButton />
              </List.Item>
            </List>
          </Modal>
        </WingBlank>
      </div>
    )
  }
}

export default AccountTab
