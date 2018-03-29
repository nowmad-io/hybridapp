import { apiGet, apiPost, apiPut } from '../requests';
import {
  PLACES,
  ADD_REVIEW,
  UPDATE_REVIEW,
  REVIEW_BY_QUERY,
  REVIEW_BY_USER,
} from '../constants/reviews';

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
  return apiGet(REVIEW_BY_USER, 'places/', { user: email });
}
