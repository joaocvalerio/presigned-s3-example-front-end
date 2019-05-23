import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './AsyncComponent'
import AuthenticatedRoute from "./AuthenticatedRoute"
import NonAuthenticatedRoute from "./NonAuthenticatedRoute"

// const AsyncAnnouncements = asyncComponent(() => import('pages/Announcements'))
const AsyncLogin = asyncComponent(() => import('../pages/login.js'))
const AsyncSignup = asyncComponent(() => import('../pages/signup'))
const AsyncHome = asyncComponent(() => import('../pages/home.js'))
const AsyncAccountUser = asyncComponent(() => import('../pages/account.js'))

const Routes = () => (
  <main style={{minHeight: '100vh'}}>
    <Switch>
      <NonAuthenticatedRoute exact path="/login" component={AsyncLogin} />
      <NonAuthenticatedRoute exact path="/signup" component={AsyncSignup} />
      <AuthenticatedRoute exact path="/" component={AsyncHome} />

      <AuthenticatedRoute exact path="/user/account" component={AsyncAccountUser} />

      <Redirect from="*" to="/" />
    </Switch>
  </main>
)

export default Routes
