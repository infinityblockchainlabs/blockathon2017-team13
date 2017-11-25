import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import InfinitePointsContract from '../../build/contracts/InfinitePoints.json'
import store from '../store'
const contract = require('truffle-contract')


const createFakeData = async () => {
  let web3 = store.getState().web3.web3Instance
  console.log(web3.eth.accounts, '@@@@@@@@')
  // Create fake data

  const accounts = web3.eth.accounts
  const ZERO_ACCOUNT = accounts[0];
  const infiniteContract = contract(InfinitePointsContract)
  infiniteContract.setProvider(web3.currentProvider)
  const contractInstance = await infiniteContract.deployed()
  await contractInstance.signup('Weup', accounts[0],
      true, 1, { from: ZERO_ACCOUNT })
  await contractInstance.signup('User 1', accounts[1],
        false, 0, { from: ZERO_ACCOUNT })
  await contractInstance.signup('Merchant 1', accounts[2],
      true, 2, { from: ZERO_ACCOUNT })

  await contractInstance.signup('User 2', accounts[3],
      false, 0, { from: ZERO_ACCOUNT })
  await contractInstance.signup('Merchant 2', accounts[4],
      true, 2, { from: ZERO_ACCOUNT })

  console.log('Weup: ', accounts[0])
  console.log('User 1: ', accounts[1])
  console.log('Merchant 1: ', accounts[2])
  console.log('User 2: ', accounts[3])
  console.log('Merchant 2: ', accounts[4])
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