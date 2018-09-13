import { put, takeLatest, call } from 'redux-saga/effects';
import NavigationService from '../libs/navigationService';

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
  yield call(NavigationService.reset);
}

export function* logoutFlow() {
  yield put({ type: STOP_SAGAS });
}

// Bootstrap sagas
export default function* root() {
  yield takeLatest([`${LOGIN}_SUCCESS`, `${REGISTER}_SUCCESS`], authenticateFlow);
  yield takeLatest(`${LOGOUT}_REQUEST`, logoutFlow);
}
