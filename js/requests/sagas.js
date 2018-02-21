import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects'

import { API_CALL, TOKEN } from './constants';

export const apiGeneric = (api) =>
function* _apiGeneric(action) {
  const { method, path, params, data } = action.payload;
  let { options } = action.payload;
  const { success, failure } = action.meta;

  const token = yield select((state) => state.auth.token);

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Token ${token}`
    }
  }
  try {
    const response = yield call(api[method], path, { params, data, options});
    console.log('response', response);
    yield put({ type: success, payload: response });
  } catch (error) {
    console.log('error', error)
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