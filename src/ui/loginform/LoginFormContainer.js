import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { loginUser } from './LoginFormActions'
import { withCookies } from 'react-cookie'

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { cookies } = ownProps

  return {
    onLoginUserClick: (coinbase) => {
      dispatch(loginUser(coinbase, cookies))
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default withCookies(LoginFormContainer)
