import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { placeSchema } from '../api/reviews';
import { PLACES, UPDATE_REVIEW } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getEntities = state => state.entities;
const getUsers = state => state.entities.users;
const getReviews = state => state.entities.reviews;
export const getPlaces = state => state.entities.places;
const getPlace = (state, id) => state.entities.places[id];

export const selectFullPlace = () => createSelector(
  [getPlace, getEntities],
  (place, entities) => denormalize(place, placeSchema, entities),
);

export const selectPlace = () => createSelector(
  [getPlace],
  place => place,
);

export const selectThumbnail = () => createSelector(
  [getPlace, getUsers, getReviews],
  (place, users, reviews) =>
    place.reviews && place.reviews.length && users[reviews[place.reviews[0]].created_by].picture,
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
