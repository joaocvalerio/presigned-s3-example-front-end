
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth/reducer'
import emailAuth from './emailAuth/reducer'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  emailAuth
})

export default rootReducer
