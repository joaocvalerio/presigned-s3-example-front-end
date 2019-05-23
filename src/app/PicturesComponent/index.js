import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  actions as authActions
} from '../../store/reducers/auth'
import {
  actions as picturesActions
} from '../../store/reducers/pictures'

import { userPlaceholderImage } from '../shared/utils/user'

import UploadPictureButton from '.././shared/buttons/UploadPictureButton'

class PicturesComponent extends Component {
  state = {
    picturePreview: null,
  }

  componentWillReceiveProps(nextProps) {
    const nextPresignedObject = nextProps.presignObject
    const nextPresignedUrl = nextPresignedObject && nextProps.presignObject.presigned_url
    const presignedUrl = this.props.presignObject && this.props.presignObject.presigned_url

    if (nextPresignedObject && this.state.file && presignedUrl !== nextPresignedUrl) {
      this.uploadToS3(nextPresignedObject, this.state.file)
    }
  }

  render() {
    const { picturePreview } = this.state
    const { user } = this.props

    return (
      <div className="pictures-component-wrapper col___gb col___gb9">
        <div className="component-buttons">
          <div id="button-upload-picture">
            <div className="picture-preview">
              <div
                className={`user-form-profile-picture ${!picturePreview ? 'before' : 'after'}`}
                style={{ backgroundImage: `url(${picturePreview || userPlaceholderImage})` }}
              />
            </div>
            <input
              type="file"
              name="file"
              onChange={(e) => this.handlePictureUpload(e)} />
              <UploadPictureButton
            />
          </div>
        </div>
        <div className="user-uploaded-pictures">
          { user.pictures.map((picture, index) => (
              this.renderUploadedImageThumbail(picture, index)
            ))
          }
        </div>
      </div>
    )
  }

  renderUploadedImageThumbail = (picture, index) => {
    const thumbnailPictureUrl = picture.url.replace(/challenge-jcv/g, "challenge-jcvresized")

    return (
      <a target='_blank' rel="noopener noreferrer" href={picture.url} key={index}>
        <div className='card-image-container'>
          <div className="card-image" style={{ backgroundImage: `url(${thumbnailPictureUrl})` }} />
        </div>
      </a>
    )
  }

  handlePictureUpload(e) {
    if (e.target.files[0]) {
      const reader = new FileReader()
      const reader2 = new FileReader()
      let file = e.target.files[0]

      reader.readAsDataURL(file)
      reader2.readAsArrayBuffer(file)

      reader.onload = (event) => {
        this.setState({
          picturePreview: [reader.result],
        })

        this.props.createPicture({
          fileName: file.name
        })
      }

      reader2.onload = (event) => {
        this.setState({
          file: event.target.result
        })
      }

      if (this.state.error) {
        this.setState({ error: null })
      }
    }
  }

  uploadToS3(presignedObject, file) {
    this.props.uploadFileToS3(presignedObject, file)
  }
}

PicturesComponent.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  presignObject: state.pictures.presignObject
})

const mapDispatchToProps = dispatch => bindActionCreators({
  destroyUser: authActions.destroyUser,
  createPicture: picturesActions.createPicture,
  uploadFileToS3: picturesActions.uploadToS3
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PicturesComponent)
