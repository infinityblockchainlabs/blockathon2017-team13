const initialState = {
  sellList: [],
  buyList: [],
  sellListLoaded: false,
  buyListLoaded: false
}

const exchangeReducer = (state = initialState, action) => {
  if (action.type === 'EXCHANGE_GOT_SELL_LIST') {
    console.log(action)
    return {
      ...state,
      sellList: action.payload,
      sellListLoaded: true,
    }
  }

  return state
}

export default exchangeReducer