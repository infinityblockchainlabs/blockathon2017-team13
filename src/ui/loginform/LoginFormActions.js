import InfinitePointsContract from '../../../build/contracts/InfinitePoints.json'
import { browserHistory } from 'react-router'
import store from '../../store'

import {
    user1, user2,
    merchant1, merchant2
} from '../../constants'

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
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        web3.personal.unlockAccount(account, password, 3000, (err) => {
            if (err) return reject(err)
            resolve()
        })
    } else {
        reject('Web3 is not initialized.');
    }
})

export function refreshAccount (account) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return (async (dispatch) => {
            try {
                const infiniteContract = contract(InfinitePointsContract)
                infiniteContract.setProvider(web3.currentProvider)
                const contractInstance = await infiniteContract.deployed()

                const accountInfo = await contractInstance.getAccountInfo({ from: account })
                const [name, rate, isMerChant, code, url, wCoinBalance] = accountInfo

                dispatch(userLoggedIn({
                    name: web3.toUtf8(name),
                    coinbase: account,
                    rate: rate.c[0],
                    isMerChant,
                    code,
                    url,
                    wecoinBalance: wCoinBalance.c[0]
                }))
            } catch (err) {
                console.log(err)
                dispatch(setErrorMessage(err.message))
            }
        })
    } else {
        console.error('Web3 is not initialized.');
    }
}

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

            const credentials = {
                'demo1': user1,
                'demo2': user2,
                'merchant1': merchant1,
                'merchant2': merchant2,
            }
            let account
            
            if (!(username in credentials)) {
                dispatch(setLoaderStatus(true))
                return dispatch(setErrorMessage('Account does not exists!'))
            } else if (password !== 'demo') {
                dispatch(setLoaderStatus(true))
                return dispatch(setErrorMessage('Wrong Password!'))
            } else {
                account = credentials[username]
            }

            const accountInfo = await contractInstance.getAccountInfo({ from: account })
            const [name, rate, isMerChant, code, url, wCoinBalance] = accountInfo

            if (cookies) {
                cookies.set('coinbase', account, { path: '/' })
                cookies.set('accountInfo', {name: web3.toUtf8(name), rate, isMerChant}, { path: '/' })
            }

            dispatch(userLoggedIn({
                name: web3.toUtf8(name),
                coinbase: account,
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
