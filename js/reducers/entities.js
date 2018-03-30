import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { placeSchema } from '../api/reviews';
import { PLACES, UPDATE_REVIEW } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const selectEntities = state => state.entities;
const placeById = (state, id) => state.entities.places[id];

export const selectPlace = () => createSelector(
  [placeById, selectEntities],
  (place, entities) => denormalize(place, placeSchema, entities),
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
