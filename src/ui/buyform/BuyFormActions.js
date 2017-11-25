import CryptoLicenseToken from '../../../build/contracts/InfinitePoints.json'
import store from '../../store'
import { loginUser, setErrorMessage, setInfoMessage, unlockAccount, setLoaderStatus } from '../loginform/LoginFormActions'

const contract = require('truffle-contract')

export function buyToken(amount, passPhrase) {
    let web3 = store.getState().web3.web3Instance
    const coinbase = store.getState().user.data.coinbase
    if (typeof web3 !== 'undefined') {
        return (async (dispatch) => {
            try {
                dispatch(setLoaderStatus(false))
                dispatch(setErrorMessage(null))
                const licenseContract = contract(CryptoLicenseToken)
                licenseContract.setProvider(web3.currentProvider)
                const licenseContractInstance = await licenseContract.deployed()
                await unlockAccount(coinbase, passPhrase)
                await licenseContractInstance.buy({ from: coinbase, value: web3.toWei(amount, 'ether') })
                dispatch(loginUser(coinbase))
                dispatch(setInfoMessage('Successfully purchased!!!'))
                dispatch(setLoaderStatus(true))
            } catch (err) {
                dispatch(setErrorMessage(err.message))
                dispatch(setLoaderStatus(true))
            }
        })
    } else {
        console.error('Web3 is not initialized.');
    }
}