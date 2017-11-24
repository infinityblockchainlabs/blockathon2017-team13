import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'
import { signUpUser } from './SignUpFormActions'

const mapStateToProps = ({ user: { data, isLoaded } }) => {
    return { ...data, isLoaded }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name, coinbase, passPhrase) => {
      dispatch(signUpUser(name, coinbase, passPhrase))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer
