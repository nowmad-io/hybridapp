import { apiCall } from '../requests';

import {
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from '../constants/reviews';

const SEARCH_PATH = 'search/';

export function fetchReviews() {
  return apiCall(SEARCH_SUCCESS, SEARCH_ERROR, 'get', SEARCH_PATH);
}
