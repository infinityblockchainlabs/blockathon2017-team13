import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import store from '../../../store'
import { setErrorMessage, setInfoMessage, unlockAccount, setLoaderStatus } from '../loginform/LoginFormActions'

const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export const getEtherBalance = (address) => new Promise((resolve, reject) => {
  let web3 = store.getState().web3.web3Instance
  if (typeof web3 !== 'undefined') {
    web3.eth.getBalance(address, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(web3.fromWei(result, 'ether'))
      }
    })
  } else {
    console.error('Web3 is not initialized.');
  }
})

export function updateUser(name, passPhrase) {
  let web3 = store.getState().web3.web3Instance
  const coinbase = store.getState().user.data.coinbase
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return (async (dispatch) => {
      try {
        dispatch(setLoaderStatus(false))
        dispatch(setErrorMessage(null))
        const authentication = contract(AuthenticationContract)
        authentication.setProvider(web3.currentProvider)
        const authenticationInstance = await authentication.deployed()
        await unlockAccount(coinbase, passPhrase)
        await authenticationInstance.update(name, { from: coinbase })
        dispatch(userUpdated({"name": name}))
        dispatch(setInfoMessage('Successfully update profile!!!'))
        dispatch(setLoaderStatus(true))
      } catch (err) {
          dispatch(setLoaderStatus(true))
          dispatch(setErrorMessage(err.message))
      }
    })
  } else {
    console.error('Web3 is not initialized.');
  }
}
