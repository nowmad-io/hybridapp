import { schema } from 'normalizr';

import { apiGet, apiPost, apiPut } from '../requests';
import {
  PLACES,
  ADD_REVIEW,
  UPDATE_REVIEW,
  REVIEW_BY_QUERY,
} from '../constants/reviews';

import { GPLACE_SEARCH } from '../constants/search';

const userSchema = new schema.Entity('users');
const categorySchema = new schema.Entity('categories');
const pictureSchema = new schema.Entity('pictures');
export const reviewSchema = new schema.Entity('reviews', {
  categories: [categorySchema],
  pictures: [pictureSchema],
  created_by: userSchema,
});
export const placeSchema = new schema.Entity('places', {
  reviews: [reviewSchema],
});

reviewSchema.define({
  place: placeSchema,
});

export function fetchPlaces() {
  return apiGet(PLACES, 'places/', {}, [placeSchema]);
}

export function addReview(data) {
  return apiPost(ADD_REVIEW, 'reviews/', data, reviewSchema);
}

export function updateReview(data) {
  return apiPut(UPDATE_REVIEW, `reviews/${data.id}/`, data, reviewSchema);
}

export function reviewsSearchByQuery(query) {
  return apiGet(REVIEW_BY_QUERY, 'places/', { query });
}

export function reviewsSearchByUser(email) {
  return apiGet(GPLACE_SEARCH, 'places/', { user: email });
}
