import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import InfinitePointsContract from '../../build/contracts/InfinitePoints.json'
import store from '../store'
const contract = require('truffle-contract')


const createFakeData = async () => {
  let web3 = store.getState().web3.web3Instance

  // Create fake data
  const ZERO_ACCOUNT = '0x5aa875e1ec71a37d671c7c25cae43d7e7e4d5830'
  const infiniteContract = contract(InfinitePointsContract)
  infiniteContract.setProvider(web3.currentProvider)
  const contractInstance = await infiniteContract.deployed()
  await contractInstance.signup('WeUP', '0x5aa875e1ec71a37d671c7c25cae43d7e7e4d5830',
      true, 1, { from: ZERO_ACCOUNT })
  await contractInstance.signup('Lezede', '0x2d1d9f60c037b1775395100b075a9b69bf3e84f1',
      true, 2, { from: ZERO_ACCOUNT })
}

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch) => {
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