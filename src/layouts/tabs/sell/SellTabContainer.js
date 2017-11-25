import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'

import SellTab from './SellTab'
import { getSellList, sellOffer } from './SellTabActions'

const mapStateToProps = (state) => {
  return {
    exchange: state.exchange,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSellList: () => { dispatch(getSellList()) },
    sellOffer: (offerId) => dispatch(sellOffer(offerId))
  }
}

const SellTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellTab)

export default withCookies(SellTabContainer)
