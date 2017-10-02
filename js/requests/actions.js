import {
  API_CALL
} from './constants';

export function apiCall(success, failure, method, path, params = {}, data = {}, options = {}){
  return {
    type: API_CALL,
    meta: {
      success,
      failure
    },
    payload: {
      method,
      path,
      params,
      data,
      options
    }
  }
}
