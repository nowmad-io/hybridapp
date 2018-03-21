import { takeLatest, put } from 'redux-saga/effects';

import { RUN_SAGAS } from '../constants/utils';

import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';

export function* friendsFlow() {
  yield put(fetchFriends());
  yield put(fetchIncomingRequests());
  yield put(fetchOutgoingRequests());
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, friendsFlow);
}
