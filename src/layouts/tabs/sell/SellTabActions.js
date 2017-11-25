import InfinitePointsContract from '../../../../build/contracts/InfinitePoints.json'
import store from '../../../store'
import { setErrorMessage } from '../../../ui/loginform/LoginFormActions'
import contract from 'truffle-contract'

export const EXCHANGE_GOT_SELL_LIST = 'EXCHANGE_GOT_SELL_LIST'

function getSellListSuccess(sellList) {
  return {
    type: EXCHANGE_GOT_SELL_LIST,
    payload: sellList,
  }
}

export function getSellList() {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return (async (dispatch, getState) => {
            try {
                const { user: { data: { coinbase } } } = getState()
                const infiniteContract = contract(InfinitePointsContract)
                infiniteContract.setProvider(web3.currentProvider)
                const contractInstance = await infiniteContract.deployed()
                const offerIds = await contractInstance.getOfferIds('buy', { from: coinbase })
                const offers = await Promise.all(offerIds.split(',').map(offerId =>
                    contractInstance.getOffer(offerId)
                ))
                dispatch(getSellListSuccess(offers.map(([id, name, fromCode,amount, fromUrl, fromAmount]) => ({
                    id,
                    username: web3.toUtf8(name),
                    merchant_icon: fromUrl,
                    merchant_code: fromCode,
                    sell_amount: amount.c[0],
                    sell_total_price: fromAmount.c[0]
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
