const initialState = {
  sellList: [],
  buyList: [],
  sellListLoaded: false,
  buyListLoaded: false
}

const exchangeReducer = (state = initialState, action) => {
  if (action.type === 'EXCHANGE_GOT_SELL_LIST') {
    return {
      ...state,
      sellList: action.payload,
      sellListLoaded: true,
    }
  }

  if (action.type === 'EXCHANGE_GOT_BUY_LIST') {
    return {
      ...state,
      buyList: action.payload,
      buyListLoaded: true,
    }
  }

  return state
}

export default exchangeReducer