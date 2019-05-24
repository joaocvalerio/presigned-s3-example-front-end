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
    if (nextProps.updateUserSuccess) {
      this.props.getUser()
      this.props.resetUpdateSuccess()

    }

    if (nextProps.createPictureSuccess) {
      this.props.resetCreateSuccess()
    }
    if (nextProps.fileUploadSuccess) {
      setTimeout( () => {
        this.props.getUser()
        this.props.resetUploadFileSuccess()
      }, 2000)
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
  createPictureSuccess: state.pictures.createPictureSuccess,
  fileUploadSuccess: state.pictures.fileUploadSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadToken: authActions.loadToken,
  loadUser: authActions.loadUser,
  getUser: authActions.getUser,
  resetUpdateSuccess: userActions.resetUpdateSuccess,
  resetCreateSuccess: picturesActions.resetCreateSuccess,
  resetUploadFileSuccess: picturesActions.resetUploadFileSuccess,
  shouldLoadAuth: authActions.shouldLoadAuth,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
