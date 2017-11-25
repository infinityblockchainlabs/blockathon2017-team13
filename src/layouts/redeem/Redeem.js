import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-redux'
import store from '../../store'
import contract from 'truffle-contract'
import InfinitePointsContract from '../../../build/contracts/InfinitePoints.json'
import { unlockAccount } from '../../ui/loginform/LoginFormActions'

import { NavBar, WingBlank, Icon, WhiteSpace, Card, Button, List, Modal } from 'antd-mobile'
import { merchant1, ZERO_ACCOUNT } from '../../constants'

class Redeem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalNotEnoughPoints: false,
    }
  }

  handleRedeemClick(points) {
    if (points > 5000) {
      this.setState({ modalNotEnoughPoints: true })
    } else {
      this.props.redeem(points)
    }
  }

  onCloseModal(key) {
    this.setState({ [key]: false })
  }

  render() {
    return(
      <main>
        <NavBar
          mode="dark"
          leftContent={<Icon type="left" onClick={() => browserHistory.goBack()} />}
        >Redeem Points</NavBar>
        <NavBar
          mode="light"
          style={{ backgroundColor: "orange" }}
        >You currently have 5,000 AMZ pts.</NavBar>
        <WingBlank>
          <WhiteSpace size="xl" />
          <div style={{ textAlign: "center" }}>
            <img src="/images/amazon_logo_RGB.jpg" width="240" height="88" />
          </div>
          <WhiteSpace size="xl" />
          <Card>
            <Card.Header
              title={<strong>Amazon Echo Dot</strong>}
              extra={<span>$49.99</span>}
            />
            <Card.Body>
              <div style={{ textAlign: "center" }}>
                <img src="/images/amazon_product_1.jpg" />
              </div>
            </Card.Body>
            <Card.Footer
              content={<Button type="primary" onClick={() => this.handleRedeemClick(3000)}>Buy with <strong>3,000 AMZ pts.</strong></Button>}
            />
          </Card>
          <WhiteSpace size="xl" />
          <Card>
            <Card.Header
              title={<strong>All-New Kindle Oasis E-reader</strong>}
              extra={<span>$249.99</span>}
            />
            <Card.Body>
              <div style={{ textAlign: "center" }}>
                <img src="/images/amazon_product_2.jpg" />
              </div>
            </Card.Body>
            <Card.Footer
              content={
                <div>
                  <Button type="primary" onClick={() => this.handleRedeemClick(10000)}>Buy with <strong>10,000 AMZ</strong> pts.</Button>
                  <WhiteSpace />
                  <Button type="warning">Buy <strong>5,000 AMZ pts.</strong> more?</Button>
                </div>
              }
            />
          </Card>
          <WhiteSpace size="xl" />

          <Modal
            popup
            visible={this.state.modalNotEnoughPoints}
            maskClosable={false}
            animationType="slide-up"
          >
            <List renderHeader={<div>You have not enough points!</div>} className="popup-list">
              <List.Item>
                <Button type="primary" onClick={() => { this.onCloseModal('modalNotEnoughPoints') }}>Ok</Button>
              </List.Item>
            </List>
          </Modal>
        </WingBlank>
      </main>
    )
  }
}

function redeemPoints(points) {
  let web3 = store.getState().web3.web3Instance
  if (typeof web3 !== 'undefined') {
    return (async (dispatch, getState) => {
      try {
        const { user: { data: { coinbase } } } = getState()
        const infiniteContract = contract(InfinitePointsContract)
        infiniteContract.setProvider(web3.currentProvider)
        const contractInstance = await infiniteContract.deployed()

        await unlockAccount(merchant1, 'testaccteamweup')
        await contractInstance.subPoints(coinbase, points, { from: merchant1 })
        
        browserHistory.goBack()
      } catch (err) {
        console.error(err)
      }
    })
  } else {
    console.error('Web3 is not initialized.');
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redeem: (points) => { dispatch(redeemPoints(points)) }
  }
}

const RedeemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Redeem)

export default RedeemContainer
