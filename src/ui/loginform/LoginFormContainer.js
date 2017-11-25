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
    onLoginUserClick: (username, password) => {
      dispatch(loginUser(username, password, cookies))
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default withCookies(LoginFormContainer)
