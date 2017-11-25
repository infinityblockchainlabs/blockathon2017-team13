import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import { loginUser, setErrorMessage, unlockAccount, setLoaderStatus } from '../loginform/LoginFormActions'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name, coinbase, passPhrase) {
  let web3 = store.getState().web3.web3Instance

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
              await authenticationInstance.signup(name, { from: coinbase })
              dispatch(loginUser(coinbase))
          } catch(err) {
              dispatch(setLoaderStatus(true))
              dispatch(setErrorMessage(err.message))
          }
      })
  } else {
    console.error('Web3 is not initialized.');
  }
}
