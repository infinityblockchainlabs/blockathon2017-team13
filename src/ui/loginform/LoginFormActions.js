import InfinitePointsContract from '../../../build/contracts/InfinitePoints.json'
import { getEtherBalance } from '../profileform/ProfileFormActions'
import { browserHistory } from 'react-router'
import store from '../../store'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE'
export const SET_LOADER_STATUS = 'SET_LOADER_STATUS'

function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function setErrorMessage(errorMessage) {
    return {
        type: SET_ERROR_MESSAGE,
        payload: { errorMessage }
    }
}

export function setInfoMessage(infoMessage) {
    return {
        type: SET_INFO_MESSAGE,
        payload: { infoMessage }
    }
}

export function setLoaderStatus(isLoaded) {
    return {
        type: SET_LOADER_STATUS,
        payload: { isLoaded }
    }
}

export const unlockAccount = (account, password) => new Promise((resolve, reject) => {
    let web3 = 'store'.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        web3.personal.unlockAccount(account, password, (err) => {
            if (err) return reject(err)
            resolve()
        })
    } else {
        reject('Web3 is not initialized.');
    }
})

export function restoreSession(cookies) {
    if (!cookies) return

    return ((dispatch) => {
        const coinbase = cookies.get('coinbase')

        if (coinbase && coinbase.length > 0) {
            const accountInfo = cookies.get('accountInfo')
            const {name, rate, isMerChant} = accountInfo
            dispatch(userLoggedIn({
                name,
                coinbase,
                rate,
                isMerChant
            }))

            const currentLocation = browserHistory.getCurrentLocation()
            
            if ('redirect' in currentLocation.query) {
                return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            browserHistory.replace('/app')
        }
    })
}

export function loginUser(username, password, cookies) {
  let web3 = store.getState().web3.web3Instance
  if (typeof web3 !== 'undefined') {
    return (async (dispatch) => {
        try {
            dispatch(setLoaderStatus(false))
            dispatch(setErrorMessage(null))
            const infiniteContract = contract(InfinitePointsContract)
            infiniteContract.setProvider(web3.currentProvider)
            const contractInstance = await infiniteContract.deployed()

            const accounts = web3.eth.accounts
            let account
            if (username === 'demo1') {
                if (password === 'demo') {
                    account = accounts[1]
                } else {
                    dispatch(setLoaderStatus(true))
                    return dispatch(setErrorMessage('Wrong Password!'))
                }
            } else if (username === 'demo2') {
                if (password === 'demo') {
                    account = accounts[3]
                } else {
                    dispatch(setLoaderStatus(true))
                    return dispatch(setErrorMessage('Wrong Password!'))
                }
            } else {
                dispatch(setLoaderStatus(true))
                return dispatch(setErrorMessage('Account does not exists!'))
            }

            const accountInfo = await contractInstance.getAccountInfo({ from: account })
            const [name, rate, isMerChant, code, url, wCoinBalance] = accountInfo
            console.log(name, rate, isMerChant, code, url, wCoinBalance)

            if (cookies) {
                cookies.set('coinbase', account, { path: '/' })
                cookies.set('accountInfo', {name: web3.toUtf8(name), rate, isMerChant}, { path: '/' })
            }

            dispatch(userLoggedIn({
                name: web3.toUtf8(name),
                account,
                rate: rate.c[0],
                isMerChant,
                code,
                url,
                wecoinBalance: wCoinBalance.c[0]
            }))
            const currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query) {
                return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }
            dispatch(setLoaderStatus(true))
            browserHistory.replace('/app')
        } catch(err) {
            dispatch(setLoaderStatus(true))
            dispatch(setErrorMessage(err.message))
        }
    })
  } else {
    console.error('Web3 is not initialized.');
  }
}
