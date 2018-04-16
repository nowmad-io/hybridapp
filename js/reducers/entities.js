import { denormalize, normalize } from 'normalizr';
import { createSelector } from 'reselect';
import shortid from 'shortid';

import { placeSchema } from '../api/reviews';
import { PLACES, ADD_REVIEW, UPDATE_REVIEW, CATEGORIES } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getEntities = state => state.entities;
const getUsers = state => state.entities.users;
export const getReviews = state => state.entities.reviews;
export const getPlaces = state => state.entities.places;
const getPlace = (state, id) => state.entities.places[id];

export const selectFullPlace = () => createSelector(
  [getPlace, getEntities],
  (place, entities) => denormalize(place, placeSchema, entities),
);

export const selectThumbnail = () => createSelector(
  [getPlace, getUsers, getReviews],
  (place, users, reviews) => users[reviews[place.reviews[0]].created_by].picture,
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
    case `${ADD_REVIEW}_REQUEST`:
    case `${UPDATE_REVIEW}_REQUEST`: {
      const { entities: { places, reviews }, result } = normalize({
        id: shortid.generate(),
        ...action.params,
      }, action.schema);
      const placeId = reviews[result].place;

      places[placeId] = {
        ...places[placeId],
        reviews: [
          result,
          ...places[placeId].reviews,
        ],
      };

      return {
        ...state,
        places: {
          ...state.places,
          ...places,
        },
        reviews: {
          ...state.reviews,
          ...reviews,
        },
      };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default entitiesReducer;
