import { take, put, race, call, fork, select } from 'redux-saga/effects';

import { LOGOUT } from '../constants/auth';
import { SEARCH_FRIENDS_SUCCESS } from '../constants/friends';
import { fetchFriends } from '../api/friends';

// Utility function to delay effects
function delay(millis) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), millis)
  });
  return promise;
}

// Fetch data every 5 seconds
function * pollFriends() {
  let state = yield select((state) => state);

  console.log('here ??', state);
  try {
    yield call(delay, 5000);
    yield put(fetchFriends(state));
  } catch (error) {
    // cancellation error -- can handle this if you wish
    return;
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
function * watchPollFriends() {
  let state = yield select((state) => state);
  console.log('here ?', state);
  yield put(fetchFriends(state));

  while (true) {
    yield take((action) => (action.meta && action.meta.model === 'friends' && action.type === "redux-crud-store/crud/FETCH_SUCCESS"));
    yield race([
      call(pollFriends),
      take(LOGOUT)
    ]);
  }
}

export default function * root() {
  console.log('here !');
  yield [fork(watchPollFriends)]
}
