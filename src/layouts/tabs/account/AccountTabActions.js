import InfinitePointsContract from '../../../../build/contracts/InfinitePoints.json'
import store from '../../../store'
import { setErrorMessage } from '../../../ui/loginform/LoginFormActions'
import contract from 'truffle-contract'

export const USER_GOT_MERCHANTS = 'USER_GOT_MERCHANTS'

function getMerchantsSuccess(merchants) {
  console.log(merchants)
  return {
    type: USER_GOT_MERCHANTS,
    payload: merchants,
  }
}

export function getMerchants() {
  let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
        return (async (dispatch) => {
            try {
                const infiniteContract = contract(InfinitePointsContract)
                infiniteContract.setProvider(web3.currentProvider)
                const contractInstance = await infiniteContract.deployed()
                dispatch(getMerchantsSuccess([
                    { name: 'WeUP', points: 100 },
                    { name: 'Lezede', points: 1000 },
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