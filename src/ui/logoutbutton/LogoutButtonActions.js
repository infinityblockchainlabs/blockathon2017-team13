import { browserHistory } from 'react-router'

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

export function logoutUser(cookies) {
  return function(dispatch) {
    if (cookies) {
      cookies.remove('coinbase', { path: '/' })
      cookies.remove('accountInfo', { path: '/' })
    }
    
    // Logout user.
    dispatch(userLoggedOut())

    // Redirect home.
    return browserHistory.push('/')
  }
}
