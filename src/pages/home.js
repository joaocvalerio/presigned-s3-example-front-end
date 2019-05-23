import React, { Component } from "react"
import PropTypes from "prop-types"

import PicturesComponent from '../app/PicturesComponent'

class Home extends Component {
  render() {
    return (
       <PicturesComponent/>
    )
  }

  onClick = () => {
    this.setState({ createPageModalOpen: true })
  }
}

export default Home
