import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './AsyncComponent'
import AuthenticatedRoute from "./AuthenticatedRoute"
import NonAuthenticatedRoute from "./NonAuthenticatedRoute"

// const AsyncAnnouncements = asyncComponent(() => import('pages/Announcements'))
const AsyncLogin = asyncComponent(() => import('../pages/login.js'))
// const AsyncSignup = asyncComponent(() => import('pages/Signup'))
// const AsyncHome = asyncComponent(() => import('pages/Home'))
// const AsyncUser = asyncComponent(() => import('pages/User'))

const Routes = () => (
  <main style={{minHeight: '100vh'}}>
    <Switch>
      <NonAuthenticatedRoute exact path="/login" component={AsyncLogin} />
      {/*<NonAuthenticatedRoute exact path="/signup" component={AsyncSignup} />*/}

      <Route exact path="/" component={AsyncLogin} />

      {/*<AuthenticatedRoute exact path="/users" component={AsyncUser} />*/}

      <Redirect from="*" to="/login" />
    </Switch>
  </main>
)

export default Routes
