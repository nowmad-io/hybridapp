import { apiCall } from '../requests';

import {
  PLACES_SUCCESS,
  PLACES_ERROR,
  REVIEW_SUCCESS,
  REVIEW_ERROR
} from '../constants/reviews';

const PLACES_PATH = 'places/';
const REVIEWS_PATH = 'reviews/';

export function fetchReviews() {
  return apiCall(PLACES_SUCCESS, PLACES_ERROR, 'get', PLACES_PATH);
}

export function addReview(review) {
  return apiCall(REVIEW_SUCCESS, REVIEW_ERROR, 'post', REVIEWS_PATH, review);
}
