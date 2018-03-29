import { put, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  ADD_REVIEW,
  UPDATE_REVIEW,
} from '../constants/reviews';
import { RUN_SAGAS } from '../constants/utils';

import { fetchPlaces } from '../api/reviews';

export function* placesFlow() {
  yield put(fetchPlaces());
}

function* reviewFlow(action) {
  const { error } = action;

  if (!error) {
    yield put(NavigationActions.back());
  }
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, placesFlow);
  yield takeLatest([`${ADD_REVIEW}_SUCCESS`, `${UPDATE_REVIEW}_SUCCESS`], reviewFlow);
}
