import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfinitePointsContract from '../../build/contracts/InfinitePoints.json'
import store from '../store'

const createFakeData = () => {
  let web3 = store.getState().web3.web3Instance
  const ZERO_ACCOUNT = '0x4be9663dfbcec3c0f009a0959764c340219ec8c1'

  return (async (dispatch) => {
    const contract = contract(InfinitePointsContract)
    contract.setProvider(web3.currentProvider)
    const contractInstance = await contract.deployed()

    contractInstance.signup('WeUP', '0x4be9663dfbcec3c0f009a0959764c340219ec8c1',
      true, 1, { from: ZERO_ACCOUNT })
    contractInstance.signup('Lezede', '0xb4537b92f071b6fe4ac6bf4b484367c681a67135',
      true, 2, { from: ZERO_ACCOUNT })
  })
}

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}


class CreateFakeData extends Component {
  componentDidMount() {
    this.props.createFakeData()
  }

  render() {
    return (
      <div>Generated data</div>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFakeData)