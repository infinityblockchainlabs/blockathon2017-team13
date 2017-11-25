import { connect } from 'react-redux'
import BuyTab from './BuyTab'
import { withCookies } from 'react-cookie'

const mapStateToProps = (state) => {
  return state.user
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const BuyTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTab)

export default withCookies(BuyTabContainer)
