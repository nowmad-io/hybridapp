import { put, takeLatest, call, take } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { eventChannel } from 'redux-saga';

import {
  ADD_REVIEW,
  UPDATE_REVIEW,
} from '../constants/reviews';
import { GET_GEOLOCATION } from '../constants/home';
import { RUN_SAGAS } from '../constants/utils';

import { apiMe } from '../api/auth';
import { fetchPlaces, fetchCategories } from '../api/reviews';
import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';

import { setGeolocation } from '../actions/home';

function getCurrentPosition() {
  return eventChannel((emit) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        emit(setGeolocation(position.coords));
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000, maximumAge: (60 * 24 * 1000) },
    );
    return () => {};
  });
}

export function* currentPosition() {
  const channel = yield call(getCurrentPosition);

  const action = yield take(channel);
  yield put(action);
}

export function* homeFlow() {
  yield put(fetchPlaces());
  yield put(fetchCategories());
  yield put(apiMe());
  yield put(fetchFriends());
  yield put(fetchIncomingRequests());
  yield put(fetchOutgoingRequests());
}

function* reviewFlow(action) {
  const { error } = action;

  if (!error) {
    yield put(NavigationActions.back());
  }
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, homeFlow);
  yield takeLatest(GET_GEOLOCATION, currentPosition);
  yield takeLatest([`${ADD_REVIEW}_SUCCESS`, `${UPDATE_REVIEW}_SUCCESS`], reviewFlow);
}
