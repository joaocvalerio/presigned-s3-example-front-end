import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as authActions } from '../store/reducers/auth'
import { actions as userActions } from '../store/reducers/users'
import { actions as picturesActions } from '../store/reducers/pictures'

import Routes from '../routes'

import MainNav from '../app/navigation/MainNav'

import './styles.scss'

class App extends Component {
  state = {
    appLoaded: false,
  }

  componentWillMount() {
    if (this.props.shouldLoadAuth) {
      this.props.loadToken()
      this.props.loadUser()
    }

    setTimeout(() => this.loadBasicData(), 0)
  }

  componentDidUpdate(prevProps) {
    if (this.state.appLoaded && !prevProps.token && this.props.token) {
      this.props.getUser()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updateUserSuccess !==nextProps.updateUserSuccess) {
      this.props.getUser()
      this.props.resetUpdateSuccess()

    }

    if (this.props.createPictureSuccess !== nextProps.createPictureSuccess) {
      this.props.getUser()
      this.props.resetCreateSuccess()
    }
  }

  render () {
    const { history } = this.props
    return (
      <BrowserRouter>
        <MainNav history={history}  />
        <div className="app-page">
          { this.state.appLoaded ? this.renderPageContainer() : <div>LOADING...</div> }
        </div>
      </BrowserRouter>
    )
  }

  renderPageContainer = () => (
    <div className="app-page-container">
      <Routes />
    </div>
  )

  loadBasicData = () => {
    Promise.all([
      this.props.token && this.props.getUser(),
    ]).then(() => this.setState({ appLoaded: true }))
  }
}

const mapStateToProps = (state, props) => ({
  token: state.auth.token,
  user: state.auth.user,
  updateUserSuccess: state.users.updateSuccess,
  createPictureSuccess: state.pictures.createPictureSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadToken: authActions.loadToken,
  loadUser: authActions.loadUser,
  getUser: authActions.getUser,
  resetUpdateSuccess: userActions.resetUpdateSuccess,
  resetCreateSuccess: picturesActions.resetCreateSuccess,
  shouldLoadAuth: authActions.shouldLoadAuth,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
