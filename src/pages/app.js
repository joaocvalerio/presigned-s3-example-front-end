import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as authActions } from '../store/reducers/auth'

import Routes from '../routes'

class App extends Component {
  state = {
    appLoaded: false,
  }

  componentWillMount() {
    if (this.props.shouldLoadAuth) {
      // this.props.loadToken()
      // this.props.loadUser()
    }

    // setTimeout(() => this.loadBasicData(), 0)
  }

  // componentDidUpdate(prevProps) {
  //   if (this.state.appLoaded && !prevProps.token && this.props.token) {
  //     this.props.getUser()
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.updateUserSuccess !== nextProps.updateSuccess) {
  //     this.props.getUser()
  //     this.props.resetUpdateSuccess()
  //   }
  // }

  render () {
    return (
      <BrowserRouter>
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadToken: authActions.loadToken,
  loadUser: authActions.loadUser,
  getUser: authActions.getUser,
  shouldLoadAuth: authActions.shouldLoadAuth,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
