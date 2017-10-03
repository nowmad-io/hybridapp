import { all, take, put, race, call, fork, select } from 'redux-saga/effects';

import { LOGOUT } from '../constants/auth';
import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS
} from '../constants/friends';
import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';
import { delay } from './utils';

// Fetch data every 5 seconds
const fetchSagas = (api) =>
function* _fetchSagas() {
  try {
    yield call(delay, 5000);
    yield put(api());
  } catch (error) {
    return;
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
const watchFetch = (api, success) =>
function * _watchFetch() {
  yield put(api());

  while (true) {
    yield take(success);
    yield race([
      call(fetchSagas(api)),
      take(LOGOUT)
    ]);
  }
}

export default function * root() {
  yield all([
    fork(watchFetch(fetchFriends, FETCH_FRIENDS_SUCCESS)),
    fork(watchFetch(fetchIncomingRequests, FETCH_FRIENDSINCOMING_SUCCESS)),
    fork(watchFetch(fetchOutgoingRequests, FETCH_FRIENDSOUTGOING_SUCCESS))
  ]);
}
