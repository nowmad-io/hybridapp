import { schema } from 'normalizr';

import { apiGet, apiPost, apiPut } from '../requests';
import {
  PLACES,
  CATEGORIES,
  ADD_REVIEW,
  UPDATE_REVIEW,
  REVIEW_BY_QUERY,
} from '../constants/reviews';

import { GPLACE_SEARCH } from '../constants/search';

const userSchema = new schema.Entity('users');
const categorySchema = new schema.Entity('categories');
const pictureSchema = new schema.Entity('pictures');
const reviewSchema = new schema.Entity('reviews', {
  categories: [categorySchema],
  pictures: [pictureSchema],
  created_by: userSchema,
});
export const placeSchema = new schema.Entity('places', {
  reviews: [reviewSchema],
});

export const simpleReviewSchema = new schema.Entity('reviews', {
  categories: [categorySchema],
  pictures: [pictureSchema],
  created_by: userSchema,
  place: placeSchema,
});

export function fetchCategories() {
  return apiGet(CATEGORIES, 'categories/', {}, [categorySchema]);
}

export function fetchPlaces() {
  return apiGet(PLACES, 'places/', {}, [placeSchema]);
}

export function addReview(data) {
  return apiPost(ADD_REVIEW, 'reviews/', data, simpleReviewSchema);
}

export function updateReview(data) {
  return apiPut(UPDATE_REVIEW, `reviews/${data.id}/`, data, simpleReviewSchema);
}

export function reviewsSearchByQuery(query) {
  return apiGet(REVIEW_BY_QUERY, 'places/', { query });
}

export function reviewsSearchByUser(email) {
  return apiGet(GPLACE_SEARCH, 'places/', { user: email });
}
