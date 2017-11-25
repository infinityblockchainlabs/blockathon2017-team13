import React, { Component } from 'react'
import {Card, Row, Col, Icon} from 'antd'
import { connect } from 'react-redux'
import store from '../store'
import contract from 'truffle-contract'
import InfinitePointsContract from '../../build/contracts/InfinitePoints.json'

import { user1, merchant1 } from '../constants'

class PurchasedSuccess extends Component {
  componentDidMount() {
    setTimeout(() => this.props.purchase(), 500)
  }

  render() {
    return (
      <div style={{background: '#ECECEC', padding: '30px'}}>
        <Card>
          <Row style={{justify: 'center'}}>
            <Col md={8} sm={24} style={{marginTop: 16}}></Col>
            <Col md={8} sm={24} style={{marginTop: 16}}>
              <div style={{textAlign: 'center', width: '100%'}}>
                <Icon type="check-circle" style={{fontSize: 100, color: '#1F90E6' }} />
                <br/>
                <br/>
                <p>Thank you for shopping with us.</p>
                <h2>You have been rewarded <strong>3000 points.</strong></h2>
                <p>Please login to <a href="/app">WeUP app</a> to check your rewards</p>
              </div>
            </Col>
            <Col md={8} sm={24} style={{marginTop: 16}}></Col>
          </Row>
        </Card>
      </div>
    )
  }
}

function purchaseItem() {
  let web3 = store.getState().web3.web3Instance
  if (typeof web3 !== 'undefined') {
    return (async (dispatch, getState) => {
      try {
        const infiniteContract = contract(InfinitePointsContract)
        infiniteContract.setProvider(web3.currentProvider)
        const contractInstance = await infiniteContract.deployed()
        await contractInstance.addPoints(user1, 3000, { from: merchant1 })
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
    purchase: () => { dispatch(purchaseItem()) }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PurchasedSuccess)


export default Container