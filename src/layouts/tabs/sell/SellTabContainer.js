import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'

import SellTab from './SellTab'
import { getSellList } from './SellTabActions'

const mapStateToProps = (state) => {
  return {
    exchange: state.exchange,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSellList: () => { dispatch(getSellList()) }
  }
}

const SellTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTab)

export default withCookies(SellTabContainer)
