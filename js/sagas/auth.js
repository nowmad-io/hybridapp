import { put, takeLatest } from 'redux-saga/effects';

import PictureUpload from '../libs/pictureUpload';

import {
  LOGOUT,
  UPDATE_PROFILE,
} from '../constants/auth';
import { STOP_SAGAS } from '../constants/utils';

import { apiUpdateProfile } from '../actions/auth';

function* profileFlow(action) {
  const { firstName, lastName } = action.data;
  let { picture } = action.data;

  if (picture) {
    const { uri, error } = yield PictureUpload(picture);

    if (!error) {
      picture = uri;
    }
  }

  yield put(apiUpdateProfile({
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
  yield takeLatest(UPDATE_PROFILE, profileFlow);
  yield takeLatest(`${LOGOUT}_REQUEST`, logoutFlow);
}
