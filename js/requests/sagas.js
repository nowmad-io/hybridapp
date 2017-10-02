/* @flow */
/* global Generator */

import { all, call, fork, put, takeEvery } from 'redux-saga/effects'

import { API_CALL, TOKEN } from './constants';

export const apiGeneric = (api) =>
function* _apiGeneric(action) {
  const { method, path, params, data, options } = action.payload;
  const { success, failure } = action.meta;

  try {
    const response = yield call(api[method], path, { params, data, options });
    yield put({ type: success, payload: response });
  } catch (error) {
    yield put({ type: failure, payload: error, error: true });
  }
}

export const setAuthorization = (api) =>
function* _setAuthorization(actions) {
  const { token } = actions;

  api.setAuthorization(token);
}

const watchApiCall = (api) => function* _watchApiCall() {
  yield takeEvery(API_CALL, apiGeneric(api))
}

const watchToken = (api) => function* _watchToken(action) {
  yield takeEvery(TOKEN, setAuthorization(api))
}

export default function requestsSaga(api) {
  return function* _requestsSaga() {
    yield all([
      fork(watchApiCall(api)),
      fork(watchToken(api))
    ]);
  }
}
