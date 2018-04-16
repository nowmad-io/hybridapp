import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';

import { API_CALL } from './constants';

export const apiGeneric = api =>
  function* _apiGeneric(action) {
    const {
      method, path, params, data, schema,
    } = action.payload;
    const { options } = action.payload;
    const { request, success, failure } = action.meta;

    const token = yield select(state => state.auth.token);

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Token ${token}`,
      };
    }

    yield put({
      type: request, params, data, schema,
    });

    try {
      const response = yield call(api[method], path, {
        params, data, options, schema,
      });
      yield put({ type: success, payload: response });
    } catch (error) {
      yield put({ type: failure, payload: error, error: true });
    }
  };

const watchApiCall = api => function* _watchApiCall() {
  yield takeEvery(API_CALL, apiGeneric(api));
};

export default function requestsSaga(api) {
  return function* _requestsSaga() {
    yield all([
      fork(watchApiCall(api)),
    ]);
  };
}
