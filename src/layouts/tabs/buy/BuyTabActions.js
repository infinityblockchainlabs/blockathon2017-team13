import store from '../../../store'

export const EXCHANGE_GOT_BUY_LIST = 'EXCHANGE_GOT_BUY_LIST'

function getBuyListSuccess(buyList) {
  console.log(buyList)
  return {
    type: EXCHANGE_GOT_BUY_LIST,
    payload: buyList,
  }
}

export function getBuyList() {
  let web3 = store.getState().web3.web3Instance

  return ((dispatch) => {
    // TODO Get info from blockchain
    dispatch(getBuyListSuccess([
      {
        id: 1,
        username: 'Trung Bird',
        merchant_icon: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
        merchant_code: 'LZD',
        buy_amount: 1000,
        buy_total_price: 100
      },
      {
        id: 2,
        username: 'Trung Bird',
        merchant_icon: 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png',
        merchant_code: 'TK',
        buy_amount: 2000,
        buy_total_price: 300
      },
    ]))
  })
}
