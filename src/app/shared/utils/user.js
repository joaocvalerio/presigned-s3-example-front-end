const userPlaceholderImage = require('../../.././assets/images/user_placeholder.jpeg')

function getInfoFormInitialState(user) {
  return {
    name: user.name,
    email: user.email,
    password: null,
    passwordConfirm: null,
    nicknameInputError: false,
    firstNameInputError: false,
    lastNameInputError: false,
    emailInputError: false,
  }
}

export {
  getInfoFormInitialState,
  userPlaceholderImage
}
