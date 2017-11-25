import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { loginUser } from './LoginFormActions'

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUserClick: (coinbase) => {
      dispatch(loginUser(coinbase))
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
