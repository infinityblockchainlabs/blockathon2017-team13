import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'

import BuyTab from './BuyTab'
import { getBuyList, buyOffer } from './BuyTabActions'

const mapStateToProps = (state) => {
  return {
    exchange: state.exchange,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuyList: () => dispatch(getBuyList()),
    buyOffer: () => dispatch(buyOffer())
  }
}

const BuyTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyTab)

export default withCookies(BuyTabContainer)
