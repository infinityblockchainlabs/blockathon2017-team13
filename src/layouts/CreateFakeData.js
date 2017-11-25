import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import InfinitePointsContract from '../../build/contracts/InfinitePoints.json'
import store from '../store'
const contract = require('truffle-contract')


const createFakeData = async () => {
  try {
      let web3 = store.getState().web3.web3Instance

      const accounts = web3.eth.accounts
      const ZERO_ACCOUNT = accounts[0];
      const infiniteContract = contract(InfinitePointsContract)
      infiniteContract.setProvider(web3.currentProvider)
      const contractInstance = await infiniteContract.deployed()

      const [weUp, user1, merchant1, user2, merchant2] = [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4]]

      await contractInstance.signup('Weup', weUp, true, 1, 'WEUP', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 })
      await contractInstance.signup('User 1', user1, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 })
      await contractInstance.signup('Merchant 1', merchant1, true, 2, 'MCN1', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 })

      await contractInstance.signup('User 2', user2, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 })
      await contractInstance.signup('Merchant 2', merchant2, true, 2, 'MCN2', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 })

      console.log('Weup: ', weUp)
      console.log('User 1: ', user1)
      console.log('Merchant 1: ', merchant1)
      console.log('User 2: ', user2)
      console.log('Merchant 2: ', merchant2)
      await contractInstance.addPoints(user1, 100, { from: merchant1 })
      await contractInstance.addPoints(user2, 200, { from: merchant1 })
      await contractInstance.addPoints(user1, 300, { from: merchant2 })
      await contractInstance.addPoints(user2, 400, { from: merchant2 })
  } catch (err) {
    console.log('ERROR!!!:', err)
  }
}

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = () => {
  return {
    createFakeData: createFakeData
  }
}

class CreateFakeData extends Component {
  render() {
    return (
      <Button onClick={() => this.props.createFakeData()}>Fake Data</Button>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFakeData)