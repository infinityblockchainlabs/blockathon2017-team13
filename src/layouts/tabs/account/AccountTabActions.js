import InfinitePointsContract from '../../../../build/contracts/InfinitePoints.json'
import store from '../../../store'
import { setErrorMessage } from '../../../ui/loginform/LoginFormActions'
import contract from 'truffle-contract'

export const USER_GOT_MERCHANTS = 'USER_GOT_MERCHANTS'

function getMerchantsSuccess(merchants) {
  return {
    type: USER_GOT_MERCHANTS,
    payload: merchants,
  }
}

export function getMerchants() {
  let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return (async (dispatch, getState) => {
            try {
                const { user: { data: { coinbase } } } = getState()
                const infiniteContract = contract(InfinitePointsContract)
                infiniteContract.setProvider(web3.currentProvider)
                const contractInstance = await infiniteContract.deployed()
                const merChantIds = await contractInstance.getMerchants({ from: coinbase })
                const merchants = await Promise.all(merChantIds.split(',').map(merchant =>
                    contractInstance.getMerchantPoints(merchant, coinbase)
                ))
                dispatch(getMerchantsSuccess(merchants.map(([name, point, code, url]) => {
                    return { name: web3.toUtf8(name), points: point.c[0], code, url };
                })))
            } catch (err) {
                console.log(err)
                dispatch(setErrorMessage(err.message))
            }
        })
    } else {
        console.error('Web3 is not initialized.');
    }
}