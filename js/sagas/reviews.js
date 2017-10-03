import { all, take, put, race, call, fork, select } from 'redux-saga/effects';

import { LOGOUT } from '../constants/auth';
import { SEARCH_SUCCESS } from '../constants/reviews';
import { fetchReviews } from '../api/reviews';
import { delay } from './utils';

// Fetch data every 5 seconds
function * pollReviews() {
  let state = yield select((state) => state);

  try {
    yield call(delay, 5000);
    yield put(fetchReviews());
  } catch (error) {
    // cancellation error -- can handle this if you wish
    return;
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
function * watchPollReviews() {
  let state = yield select((state) => state);

  yield put(fetchReviews());

  while (true) {
    yield take(SEARCH_SUCCESS);
    yield race([
      call(pollReviews),
      take(LOGOUT)
    ]);
  }
}

export default function * root() {
  yield all([
    fork(watchPollReviews)
  ]);
}
