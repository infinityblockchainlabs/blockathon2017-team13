import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'

import AdvertiseTab from './AdvertiseTab'

const mapStateToProps = (state) => {
  return {
    exchange: state.exchange,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const AdvertiseTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertiseTab)

export default withCookies(AdvertiseTabContainer)
