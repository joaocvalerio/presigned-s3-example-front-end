import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

import * as actionTypes from './actionTypes'

const cookies = new Cookies()

export function setToken(token) {
  cookies.set('devolutAuthToken', token, { path: '/' })

  return {
    type: actionTypes.SET_TOKEN,
    result: { data: { token } }
  }
}

export function loadToken() {
  const token = cookies.get('devolutAuthToken')

  return {
    type: actionTypes.LOAD_TOKEN,
    result: { data: { token } }
  }
}

export function loadUser() {
  return {
    type: actionTypes.LOAD_USER
  }
}

export function getUser() {
  const devolutAuthToken = cookies.get('devolutAuthToken')
  let tokenDecoded, userSlug
  if (devolutAuthToken) {
    tokenDecoded  = jwtDecode(devolutAuthToken)
    userSlug = tokenDecoded.user_slug
  }

  return {
    types: [actionTypes.GET_USER, actionTypes.GET_USER_SUCCESS, actionTypes.GET_USER_FAIL],
    promise: (client) => client.get(`users/${userSlug}`)
  }
}

export function destroyUser(userData) {
  return {
    types: [actionTypes.DESTROY_USER, actionTypes.DESTROY_USER_SUCCESS, actionTypes.DESTROY_USER_FAIL],
    promise: (client) => client.delete(`users/${userData.eiyu_slug}`, {
      data: {
        user: userData
      }
    })
  }
}

export function logout() {
  cookies.remove('devolutAuthToken', { path: '/' })
  cookies.remove('devolutUserData', { path: '/' })
  return {
    type: actionTypes.LOGOUT
  }
}

export function shouldLoadAuth(globalState) {
  const devolutAuthToken = cookies.get(globalState.auth, 'devolutAuthToken')

  return devolutAuthToken && !globalState.auth.user
}
