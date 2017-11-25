import store from '../../../store'

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

  return ((dispatch) => {
    // TODO Get info from blockchain
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
  })
}
