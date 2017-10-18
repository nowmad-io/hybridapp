import { apiCall } from '../requests';

import {
  PLACES_SUCCESS,
  PLACES_ERROR
} from '../constants/reviews';

const PLACES_PATH = 'places/';

export function fetchReviews() {
  return apiCall(PLACES_SUCCESS, PLACES_ERROR, 'get', PLACES_PATH);
}
