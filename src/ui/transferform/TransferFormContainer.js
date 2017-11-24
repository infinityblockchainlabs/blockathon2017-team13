import { connect } from 'react-redux'
import TransferForm from './TransferForm'
import { transferTo } from './TransferFormActions'

const mapStateToProps = (state) => {
  return state.user.data
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTransferFormSubmit: (receiver, amount, passPhrase) => {
      dispatch(transferTo(receiver, amount, passPhrase))
    }
  }
}

const TransferFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferForm)

export default TransferFormContainer
