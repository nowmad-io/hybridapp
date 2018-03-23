import { put, takeLatest, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { RUN_SAGAS } from '../constants/utils';
import { GET_GEOLOCATION } from '../constants/home';

import { apiMe } from '../api/auth';

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
  yield put(apiMe());
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, homeFlow);
  yield takeLatest(GET_GEOLOCATION, currentPosition);
}
