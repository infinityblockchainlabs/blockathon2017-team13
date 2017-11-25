const initialState = {
  data: null,
  errorMessage: null,
  infoMessage: null,
  isLoaded: true
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED') {
    return {
      ...state,
      data: action.payload
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

  return state
}

export default userReducer
