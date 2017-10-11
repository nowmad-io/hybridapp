import { all, fork, take } from 'redux-saga/effects';

import { SEARCH_SUCCESS } from '../constants/reviews';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { fetchReviews } from '../api/reviews';

import { pollSaga } from './utils';

export default function * root() {
  yield take(RUN_SAGAS);

  yield all([
    fork(pollSaga(fetchReviews, SEARCH_SUCCESS, STOP_SAGAS))
  ]);
}
