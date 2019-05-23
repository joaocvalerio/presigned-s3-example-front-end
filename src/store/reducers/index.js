
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth/reducer'
import emailAuth from './emailAuth/reducer'
import users from './users/reducer'
import pictures from './pictures/reducer'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  emailAuth,
  users,
  pictures
})

export default rootReducer
