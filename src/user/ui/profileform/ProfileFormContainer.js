import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { updateUser } from './ProfileFormActions'

const mapStateToProps = (state) => {
  return state.user.data
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (name, passPhrase) => {
      event.preventDefault();

      dispatch(updateUser(name, passPhrase))
    }
  }
}

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)

export default ProfileFormContainer
