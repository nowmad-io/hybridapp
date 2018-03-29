import { put, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  LOGIN,
  REGISTER,
  LOGOUT,
} from '../constants/auth';

import { STOP_SAGAS } from '../constants/utils';

/**
 * Log in saga
 */
function* authenticateFlow() {
  yield put(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'App' })],
  }));
}

export function* logoutFlow() {
  yield put({ type: STOP_SAGAS });
}

// Bootstrap sagas
export default function* root() {
  yield takeLatest([`${LOGIN}_SUCCESS`, `${REGISTER}_SUCCESS`], authenticateFlow);
  yield takeLatest(`${LOGOUT}_REQUEST`, logoutFlow);
}
