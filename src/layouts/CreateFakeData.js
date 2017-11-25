import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import InfinitePointsContract from '../../build/contracts/InfinitePoints.json'
import store from '../store'
const contract = require('truffle-contract')
import { unlockAccount } from '../ui/loginform/LoginFormActions'

import {
    ZERO_ACCOUNT, user1, user2, user3, user4, user5,
    merchant1, merchant2, merchant3, merchant4, merchant5
} from '../constants'


const createFakeData = async () => {
  try {
      let web3 = store.getState().web3.web3Instance
      const infiniteContract = contract(InfinitePointsContract)
      infiniteContract.setProvider(web3.currentProvider)
      const contractInstance = await infiniteContract.deployed()

      console.log('Creating new acc...')
      // await Promise.all([
      //     contractInstance.signup('Weup', ZERO_ACCOUNT, true, 1, 'WEUP', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Alice', user1, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Amazone', merchant1, true, 2, 'AMAZONE', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Bob', user2, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Ebay', merchant2, true, 3, 'EBAY', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Michael', user3, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Rakuten', merchant3, true, 4, 'RACKUTEN', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Lynn', user4, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Alibaba', merchant4, true, 5, 'ALIBABA', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Jack', user5, false, 0, 'null', 'null', { from: ZERO_ACCOUNT, gas: 1000000 }),
      //     contractInstance.signup('Lazada', merchant5, true, 6, 'LAZADA', 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png', { from: ZERO_ACCOUNT, gas: 1000000 })
      // ])
      console.log('Weup: ', ZERO_ACCOUNT)
      console.log('User 1: ', user1)
      console.log('Merchant 1: ', merchant1)
      console.log('User 2: ', user2)
      console.log('Merchant 2: ', merchant2)
      console.log('User 3: ', user3)
      console.log('Merchant 3: ', merchant3)
      console.log('User 4: ', user4)
      console.log('Merchant 4: ', merchant4)
      console.log('User 5: ', user5)
      console.log('Merchant 5: ', merchant5)

      console.log('Adding points...')
      await Promise.all([merchant1, merchant2, merchant3, merchant4, merchant5].map(merchant => unlockAccount(merchant, 'testaccteamweup')))
      await Promise.all([
          contractInstance.addPoints(user1, 1000, { from: merchant1 }),
          contractInstance.addPoints(user2, 2000, { from: merchant1 }),
          contractInstance.addPoints(user1, 3000, { from: merchant2 }),
          contractInstance.addPoints(user2, 4000, { from: merchant2 }),
          contractInstance.addPoints(user1, 3000, { from: merchant3 }),
          contractInstance.addPoints(user2, 4000, { from: merchant3 }),
          contractInstance.addPoints(user1, 3000, { from: merchant4 }),
          contractInstance.addPoints(user2, 4000, { from: merchant4 }),
          contractInstance.addPoints(user1, 3000, { from: merchant5 }),
          contractInstance.addPoints(user2, 4000, { from: merchant5 })
      ])

      console.log('Adding wcoins...')
      await unlockAccount(ZERO_ACCOUNT, 'testaccteamweup')
      await Promise.all([
          contractInstance.addWcoins(user1, 1000, { from: ZERO_ACCOUNT }),
          contractInstance.addWcoins(user2, 2000, { from: ZERO_ACCOUNT }),
          contractInstance.addWcoins(user3, 3000, { from: ZERO_ACCOUNT }),
          contractInstance.addWcoins(user4, 4000, { from: ZERO_ACCOUNT }),
          contractInstance.addWcoins(user5, 4000, { from: ZERO_ACCOUNT })
      ])

      console.log('Create Offer...')
      await Promise.all([user3, user4, user5].map(user => unlockAccount(user, 'testaccteamweup')))
      await Promise.all([
          contractInstance.createOffer('usr3Buy', 'buy', merchant1, merchant2, 30, { from: user3, gas: 1000000 }),
          contractInstance.createOffer('usr3Sell', 'sell', merchant2, merchant3, 40, { from: user3, gas: 1000000 }),
          contractInstance.createOffer('usr4Buy', 'buy', merchant3, merchant4, 50, { from: user4, gas: 1000000 }),
          contractInstance.createOffer('usr4Sell', 'sell', merchant4, merchant5, 60, { from: user4, gas: 1000000 }),
          contractInstance.createOffer('usr5Buy', 'buy', merchant5, merchant4, 70, { from: user5, gas: 1000000 }),
          contractInstance.createOffer('usr5Sell', 'sell', merchant1, merchant5, 80, { from: user5, gas: 1000000 })
      ])

      console.log('SEED DATA SUCCESS!!!!')
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