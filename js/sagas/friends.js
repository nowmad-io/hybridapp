import { all, take, put, race, call, fork, select } from 'redux-saga/effects';

import { LOGOUT } from '../constants/auth';
import {
  FETCH_FRIENDS_SUCCESS,
} from '../constants/friends';
import { fetchFriends } from '../api/friends';
import { delay } from './utils';

// Fetch data every 5 seconds
function * pollFriends() {
  let state = yield select((state) => state);

  try {
    yield call(delay, 5000);
    yield put(fetchFriends(state));
  } catch (error) {
    return;
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
function * watchPollFriends() {
  let state = yield select((state) => state);

  yield put(fetchFriends(state));

  while (true) {
    yield take(FETCH_FRIENDS_SUCCESS);
    yield race([
      call(pollFriends),
      take(LOGOUT)
    ]);
  }
}

export default function * root() {
  yield all([
    fork(watchPollFriends)
  ]);
}
