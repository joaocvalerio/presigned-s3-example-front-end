import * as actionTypes from './actionTypes'

const initialState = {
  presignObject: null,
  detail: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.CREATE_PICTURE:
      return {
        ...state,
        pictureCreating: true,
      }
    case actionTypes.CREATE_PICTURE_SUCCESS:
      return {
        ...state,
        pictureCreating: false,
        createPictureSuccess: true,
        presignObject: action.result.meta.presign_object
      }
    case actionTypes.CREATE_PICTURE_FAIL:
      return {
        ...state,
        pictureCreating: false,
        error: action.error,
        createPictureSuccess: false,
      }
    case actionTypes.CREATE_SUCCESS_RESET:
      return {
        ...state,
        createPictureSuccess: false,
        error: null,
      }
    case actionTypes.UPLOAD_FILE_SUCCESS:
      return {
        fileUploading: false,
        fileUploadSuccess: true,
      }
    case actionTypes.UPLOAD_FILE_FAIL:
      return {
        fileUploading: false,
        error: action.error,
        fileUploadSuccess: false,
      }
    case actionTypes.UPLOAD_FILE_SUCCESS_RESET:
      return {
        fileUploadSuccess: false,
        error: null,
      }
    case actionTypes.RESET: {
      return initialState
    }

    default:
      return state
  }
}
