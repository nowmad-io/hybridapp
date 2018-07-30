import {
  put, takeLatest, call, take, select, fork, all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { denormalize } from 'normalizr';
import _ from 'lodash';

import NavigationService from '../navigationService';
import { apiCall } from '../requests/actions';

import {
  ADD_REVIEW,
  UPDATE_REVIEW,
} from '../constants/reviews';
import { GET_GEOLOCATION } from '../constants/home';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';
import { FETCH_FRIENDSINCOMING, ACCEPT_FRIENDSHIP, FETCH_FRIENDS } from '../constants/friends';

import { apiMe } from '../api/auth';
import {
  fetchPlaces, fetchCategories, addReview, simpleReviewSchema,
} from '../api/reviews';
import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';

import { setGeolocation } from '../actions/home';

import { pollSaga } from './utils';

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

function* currentPosition() {
  const channel = yield call(getCurrentPosition);

  const action = yield take(channel);
  yield put(action);
}

function* syncReviews() {
  const { entities } = yield select();
  const { reviews } = entities;

  yield all(_.filter(reviews, { toSync: true }).map((review) => {
    const { place, ...reviewToUpdate } = denormalize(review, simpleReviewSchema, entities);
    return put(apiCall(addReview(reviewToUpdate)));
  }));
}

function* homeFlow() {
  yield put(fetchPlaces());
  yield put(fetchCategories());
  yield put(apiMe());
  yield put(fetchOutgoingRequests());

  yield fork(syncReviews);
  yield fork(pollSaga(fetchIncomingRequests, `${FETCH_FRIENDSINCOMING}_SUCCESS`, STOP_SAGAS));
  yield fork(pollSaga(fetchFriends, `${FETCH_FRIENDS}_SUCCESS`, STOP_SAGAS));
}

function* reviewFlow() {
  yield call(NavigationService.back);
}

function* updatePlaces(action) {
  const { type, payload } = action;
  const { friends: { all: allFriends } } = yield select();

  if (type === `${FETCH_FRIENDS}_SUCCESS` || payload.length !== allFriends.length) {
    yield put(fetchPlaces());
  }
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, homeFlow);
  yield takeLatest(GET_GEOLOCATION, currentPosition);
  yield takeLatest([`${ADD_REVIEW}_REQUEST`, `${UPDATE_REVIEW}_REQUEST`], reviewFlow);
  yield takeLatest([`${ACCEPT_FRIENDSHIP}_SUCCESS`, `${FETCH_FRIENDS}_SUCCESS`], updatePlaces);
}
