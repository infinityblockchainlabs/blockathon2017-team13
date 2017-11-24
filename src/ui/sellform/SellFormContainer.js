import { connect } from 'react-redux'
import SellForm from './SellForm'
import { sellToken } from './SellFormActions'

const mapStateToProps = (state) => {
  return state.user.data
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSellFormSubmit: (amount, passPhrase) => {
      event.preventDefault();
      dispatch(sellToken(amount, passPhrase))
    }
  }
}

const SellFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SellForm)

export default SellFormContainer
