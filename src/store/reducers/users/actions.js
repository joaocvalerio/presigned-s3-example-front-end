import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

import * as actionTypes from './actionTypes'

const cookies = new Cookies()


export function loadUserDetail(id) {
  return {
    types: [actionTypes.LOAD_DETAIL, actionTypes.LOAD_DETAIL_SUCCESS, actionTypes.LOAD_DETAIL_FAIL],
    promise: (client) => client.get(`users/${id}`)
  }
}

export function updateUserDetail(data) {
  const id = jwtDecode(cookies.get('devolutAuthToken')).user_id

  return {
    types: [actionTypes.UPDATE_DETAIL, actionTypes.UPDATE_DETAIL_SUCCESS, actionTypes.UPDATE_DETAIL_FAIL],
    promise: (client) => client.patch(`users/${id}`, {
      data: {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          profile_picture_file_name: data.fileName
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

export function resetUpdateSuccess() {
  return {
    type: actionTypes.UPDATE_SUCCESS_RESET
  }
}
