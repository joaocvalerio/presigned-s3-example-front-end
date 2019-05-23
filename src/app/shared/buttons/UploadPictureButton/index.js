import React, { Component } from 'react'

import Icon from '../../icons/'

export default class UploadPictureButton extends Component {
  render() {
    return (
      <div className="upload-picture-button">
        <Icon name="add" />
        <h2 className="button-text">upload</h2>
      </div>
    )
  }
}
