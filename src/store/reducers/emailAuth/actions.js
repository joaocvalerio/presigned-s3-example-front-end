import * as actionTypes from './actionTypes'

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function signup(userData) {
  return {
    types: [actionTypes.LOGIN, actionTypes.LOGIN_SUCCESS, actionTypes.LOGIN_FAIL],
    promise: (client) => client.post('users', {
      data: {
        email: userData.email,
        password: userData.password,
      }
    })
  }
}

export function login(email, password) {
  return {
    types: [actionTypes.LOGIN, actionTypes.LOGIN_SUCCESS, actionTypes.LOGIN_FAIL],
    promise: (client) => client.post('users/sign_in', {
      data: {
        user: {
          email: email,
          password: password
        }
      }
    })
  }
}

export function identifyUser(email) {
  return {
    types: [actionTypes.IDENTIFY_EMAIL, actionTypes.IDENTIFY_EMAIL_SUCCESS, actionTypes.IDENTIFY_EMAIL_FAIL],
    promise: (client) => client.post('users/password', {
      data: {
        email: email
      }
    })
  }
}

export function recoverPassword(recoverData) {
  return {
    types: [actionTypes.RECOVER_PASSWORD, actionTypes.RECOVER_PASSWORD_SUCCESS, actionTypes.RECOVER_PASSWORD_FAIL],
    promise: (client) => client.patch('users/password', {
      data: {
        reset_password_token: recoverData.recoverToken,
        password: recoverData.password,
        password_confirmation: recoverData.passwordConfirm
      }
    })
  }
}

