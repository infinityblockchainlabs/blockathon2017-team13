import InfinitePointsContract from '../../../../build/contracts/InfinitePoints.json'
import store from '../../../store'
import { setErrorMessage } from '../../../ui/loginform/LoginFormActions'
import contract from 'truffle-contract'

export const EXCHANGE_GOT_SELL_LIST = 'EXCHANGE_GOT_SELL_LIST'

function getSellListSuccess(sellList) {
  console.log(sellList)
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

                dispatch(getSellListSuccess([
                    {
                        id: 1,
                        username: 'Trung Bird',
                        merchant_icon: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                        merchant_code: 'LZD',
                        sell_amount: 1000,
                        sell_total_price: 100
                    },
                    {
                        id: 2,
                        username: 'Trung Bird',
                        merchant_icon: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
                        merchant_code: 'TK',
                        sell_amount: 2000,
                        sell_total_price: 300
                    },
                ]))
            } catch (err) {
                console.log(err)
                dispatch(setErrorMessage(err.message))
            }
        })
    } else {
        console.error('Web3 is not initialized.');
    }
}
