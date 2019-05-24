import * as actionTypes from './actionTypes'

export function createPicture(data) {
  return {
    types: [actionTypes.CREATE_PICTURE, actionTypes.CREATE_PICTURE_SUCCESS, actionTypes.CREATE_PICTURE_FAIL],
    promise: (client) => client.post('pictures', {
      data: {
        picture: {
          picture_file_name: data.fileName,
        }
      }
    })
  }
}

export function uploadToS3(presignedObject, file) {
  return {
    types: [actionTypes.UPLOAD_FILE, actionTypes.UPLOAD_FILE_SUCCESS, actionTypes.UPLOAD_FILE_FAIL],
    promise: (client) => client.put( presignedObject.presigned_url, {
      headers: { 'Content-Type':  presignedObject.content_type },
      data: file
    })
  }
}

export function resetCreateSuccess() {
  return {
    type: actionTypes.CREATE_SUCCESS_RESET
  }
}

export function resetUploadFileSuccess() {
  return {
    type: actionTypes.UPLOAD_FILE_SUCCESS_RESET
  }
}
