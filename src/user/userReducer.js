const initialState = {
  data: null,
  wecoinBalance: 0,
  merchants: [],
  errorMessage: null,
  infoMessage: null,
  isLoaded: true
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED' || action.type === 'USER_GOT_ACCOUNT_INFO') {
    return {
      ...state,
      data: action.payload,
      wecoinBalance: action.payload.wecoinBalance || 0
    }
  }

  if (action.type === 'SET_ERROR_MESSAGE' || action.type === 'SET_INFO_MESSAGE' || action.type === 'SET_LOADER_STATUS') {
    return {
      ...state,
      ...action.payload
    }
  }

  if (action.type === 'USER_LOGGED_OUT') {
    return {
      ...state,
      data: null
    }
  }

  if (action.type === 'USER_GOT_MERCHANTS') {
    return {
      ...state,
      merchants: action.payload
    }
  }

  return state
}

export default userReducer
