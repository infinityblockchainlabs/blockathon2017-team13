import { connect } from 'react-redux'
import BuyForm from './BuyForm'
import { buyToken } from './BuyFormActions'

const mapStateToProps = (state) => {
  return state.user.data
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBuyFormSubmit: (amount, passPhrase) => {
      event.preventDefault();
      dispatch(buyToken(amount, passPhrase))
    }
  }
}

const BuyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyForm)

export default BuyFormContainer
