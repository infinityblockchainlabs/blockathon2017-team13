import { connect } from 'react-redux'
import AccountTab from './AccountTab'
import { withCookies } from 'react-cookie'
import { getMerchants } from './AccountTabActions'

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMerchants: () => { dispatch(getMerchants()) }
  }
}

const AccountTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTab)

export default withCookies(AccountTabContainer)
