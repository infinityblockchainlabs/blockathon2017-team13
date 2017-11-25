import store from '../../../store'

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

  return ((dispatch) => {
    // TODO Get info from ETH
    dispatch(getMerchantsSuccess([
      { name: 'WeUP', points: 100 },
      { name: 'Lezede', points: 1000 },
    ]))
  })
}