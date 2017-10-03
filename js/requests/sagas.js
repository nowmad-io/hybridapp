/* @flow */
/* global Generator */

import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'

import { API_CALL, TOKEN } from './constants';

export const apiGeneric = (api) =>
function* _apiGeneric(action) {
  const { method, path, params, data } = action.payload;
  let { options } = action.payload;
  const { success, failure } = action.meta;

  // const token = yield select((state) => state.auth.token);
  // console.log('token', token);
  // if (token) {
  //   options.headers = {
  //     ...options.headers,
  //     Authorization: `Token ${token}`
  //   }
  // }
  // console.log('options', options);
  try {
    const response = yield call(api[method], path, { params, data, options});
    yield put({ type: success, payload: response });
  } catch (error) {
    yield put({ type: failure, payload: error, error: true });
  }
}

const watchApiCall = (api) => function* _watchApiCall() {
  yield takeEvery(API_CALL, apiGeneric(api))
}

export default function requestsSaga(api) {
  return function* _requestsSaga() {
    yield all([
      fork(watchApiCall(api))
    ]);
  }
}
