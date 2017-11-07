import { put, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  REVIEW_SUCCESS,
  REVIEW_ERROR,
  ADD_UPDATE_REVIEW
} from '../constants/reviews';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { addOrUpdateReview } from '../actions/reviews';
import { fetchReviews } from '../api/reviews';
import { pollSaga } from './utils';

export function * reviewsFlow() {
  yield put(fetchReviews());
}

export function * reviewFlow(action) {
  const { error, payload } = action;

  if (!error) {
    yield put(addOrUpdateReview(payload));
    yield put(NavigationActions.back());
  }
}

export default function _root(socket) {
  return function * root() {
    yield takeLatest(RUN_SAGAS, reviewsFlow);
    yield takeLatest([REVIEW_SUCCESS, REVIEW_ERROR], reviewFlow);
  }
}
