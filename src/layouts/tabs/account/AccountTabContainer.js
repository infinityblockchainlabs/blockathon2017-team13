import { connect } from 'react-redux'
import AccountTab from './AccountTab'
import { withCookies } from 'react-cookie'

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

const AccountTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTab)

export default withCookies(AccountTabContainer)
