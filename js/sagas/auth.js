import { put, takeLatest, call } from 'redux-saga/effects';

import NavigationService from '../libs/navigationService';
import PictureUpload from '../libs/pictureUpload';

import {
  LOGIN,
  REGISTER,
  LOGOUT,
} from '../constants/auth';
import { STOP_SAGAS } from '../constants/utils';

import { apiRegister } from '../actions/auth';

function* authenticateFlow() {
  yield call(NavigationService.reset);
}

function* registerFlow(action) {
  const {
    email, password, firstName, lastName,
  } = action.data;
  let { picture } = action.data;

  if (picture) {
    const { uri, error } = yield PictureUpload(picture);

    if (!error) {
      picture = uri;
    }
  }

  yield put(apiRegister({
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    picture,
  }));
}

export function* logoutFlow() {
  yield put({ type: STOP_SAGAS });
}

// Bootstrap sagas
export default function* root() {
  yield takeLatest(REGISTER, registerFlow);
  yield takeLatest([`${LOGIN}_SUCCESS`, `${REGISTER}_SUCCESS`], authenticateFlow);
  yield takeLatest(`${LOGOUT}_REQUEST`, logoutFlow);
}
