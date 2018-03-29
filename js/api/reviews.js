import { apiGet, apiPost, apiPut } from '../requests';
import {
  PLACES,
  ADD_REVIEW,
  UPDATE_REVIEW,
  REVIEW_BY_QUERY,
} from '../constants/reviews';

import { GPLACE_SEARCH } from '../constants/search';

export function fetchPlaces() {
  return apiGet(PLACES, 'places/');
}

export function addReview(data) {
  return apiPost(ADD_REVIEW, 'reviews/', data);
}

export function updateReview(data) {
  return apiPut(UPDATE_REVIEW, `reviews/${data.id}/`, data);
}

export function reviewsSearchByQuery(query) {
  return apiGet(REVIEW_BY_QUERY, 'places/', { query });
}

export function reviewsSearchByUser(email) {
  return apiGet(GPLACE_SEARCH, 'places/', { user: email });
}
