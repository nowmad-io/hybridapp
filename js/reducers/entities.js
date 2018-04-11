import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { placeSchema } from '../api/reviews';
import { PLACES, UPDATE_REVIEW, CATEGORIES } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getEntities = state => state.entities;
const getUsers = state => state.entities.users;
export const getReviews = state => state.entities.reviews;
export const getPlaces = state => state.entities.places;

export const selectFullPlace = place => createSelector(
  [getEntities],
  entities => denormalize(place, placeSchema, entities),
);

export const selectThumbnail = place => createSelector(
  [getUsers, getReviews],
  (users, reviews) => users[reviews[place.reviews[0]].created_by].picture,
);

const initialState = {
  places: {},
  reviews: {},
  categories: {},
  pictures: {},
  users: {},
};

const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${PLACES}_SUCCESS`:
      return {
        ...state,
        places: { ...state.places, ...action.payload.entities.places },
        reviews: { ...state.reviews, ...action.payload.entities.reviews },
        categories: { ...state.categories, ...action.payload.entities.categories },
        pictures: { ...state.pictures, ...action.payload.entities.pictures },
        users: { ...state.users, ...action.payload.entities.users },
      };
    case `${CATEGORIES}_SUCCESS`:
      return {
        ...state,
        categories: {
          ...state.categories,
          ...action.payload.entities.categories,
        },
      };
    case `${UPDATE_REVIEW}_SUCCESS`:
      return {
        ...state,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default entitiesReducer;
