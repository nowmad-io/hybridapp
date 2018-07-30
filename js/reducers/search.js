import { createSelector } from 'reselect';
import Fuse from 'fuse.js';
import _ from 'lodash';

import {
  PEOPLE_SEARCH,
  REVIEWS_SEARCH,
  PLACES_SEARCH,
} from '../constants/search';
import { LOGOUT } from '../constants/auth';

import { getReviews } from './entities';

const options = {
  shouldSort: true,
  keys: [
    'short_description',
    'information',
    'categories.name',
  ],
};

const getFuse = createSelector(
  [getReviews],
  reviews => new Fuse(_.map(reviews, review => review), options),
);

const getQuery = state => state.search.query;

export const selectFilteredReviews = createSelector(
  [getFuse, getQuery],
  (fuse, query) => fuse.search(query),
);

const initialState = {
  reviews: [],
  people: [],
  places: [],
  peopleLoading: true,
  placesLoading: true,
  query: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_SEARCH:
      return {
        ...state,
        peopleLoading: true,
      };
    case `${PEOPLE_SEARCH}_SUCCESS`:
      return {
        ...state,
        peopleLoading: false,
        people: action.payload,
      };
    case PLACES_SEARCH:
      return {
        ...state,
        placesLoading: true,
      };
    case `${PLACES_SEARCH}_SUCCESS`:
      return {
        ...state,
        placesLoading: false,
        places: action.payload,
      };
    case `${PEOPLE_SEARCH}_ERROR`:
    case `${PLACES_SEARCH}_ERROR`:
      return {
        ...state,
        peopleLoading: false,
        placesLoading: false,
      };
    case REVIEWS_SEARCH:
      return {
        ...state,
        query: action.query,
      };
    case `${LOGOUT}_REQUEST`:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
