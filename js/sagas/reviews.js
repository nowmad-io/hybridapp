import { all, fork, takeLatest } from 'redux-saga/effects';

import { SEARCH_SUCCESS } from '../constants/reviews';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { fetchReviews } from '../api/reviews';
import { pollSaga } from './utils';

export default function _root(socket) {
  return function * root() {
    yield takeLatest(RUN_SAGAS, function* () {
      yield all([
        fork(pollSaga(fetchReviews, SEARCH_SUCCESS, STOP_SAGAS))
      ]);
    });
  }
}
