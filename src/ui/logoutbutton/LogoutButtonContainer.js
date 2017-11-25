import { connect } from 'react-redux'
import LogoutButton from './LogoutButton'
import { logoutUser } from './LogoutButtonActions'
import { withCookies } from 'react-cookie'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { cookies } = ownProps

  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();

      dispatch(logoutUser(cookies))
    }
  }
}

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)

export default withCookies(LogoutButtonContainer)
