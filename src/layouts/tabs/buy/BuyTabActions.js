import InfinitePointsContract from '../../../../build/contracts/InfinitePoints.json'
import store from '../../../store'
import { setErrorMessage, refreshAccount, unlockAccount } from '../../../ui/loginform/LoginFormActions'
import contract from 'truffle-contract'

export const EXCHANGE_GOT_BUY_LIST = 'EXCHANGE_GOT_BUY_LIST'

function getBuyListSuccess(buyList) {
  return {
    type: EXCHANGE_GOT_BUY_LIST,
    payload: buyList,
  }
}

export function getBuyList() {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return (async (dispatch, getState) => {
            try {
                const { user: { data: { coinbase } } } = getState()
                const infiniteContract = contract(InfinitePointsContract)
                infiniteContract.setProvider(web3.currentProvider)
                const contractInstance = await infiniteContract.deployed()
                const offerIds = await contractInstance.getOfferIds('sell', { from: coinbase })
                const offers = await Promise.all(offerIds.split(',').map(offerId =>
                    contractInstance.getOffer(offerId)
                ))
                dispatch(getBuyListSuccess(offers.map(([id, name, fromCode, amount, fromUrl, fromAmount]) => ({
                    id,
                    username: web3.toUtf8(name),
                    merchant_icon: fromUrl,
                    merchant_code: fromCode,
                    buy_amount: amount.c[0],
                    buy_total_price: fromAmount.c[0]
                }))))
            } catch (err) {
                console.log(err)
                dispatch(setErrorMessage(err.message))
            }
        })
    } else {
        console.error('Web3 is not initialized.');
    }
}

export function buyOffer(offerId) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return (async (dispatch, getState) => {
            try {
                const { user: { data: { coinbase } } } = getState()
                const infiniteContract = contract(InfinitePointsContract)
                infiniteContract.setProvider(web3.currentProvider)
                const contractInstance = await infiniteContract.deployed()
                await unlockAccount(coinbase, 'testaccteamweup')
                await contractInstance.convertPoint(offerId, { from: coinbase })
                dispatch(refreshAccount(coinbase))
                dispatch(getBuyList())
            } catch (err) {
                console.log(err)
                dispatch(setErrorMessage(err.message))
            }
        })
    } else {
        console.error('Web3 is not initialized.');
    }
}
