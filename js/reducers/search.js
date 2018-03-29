import {
  NEARBY,
  GPLACE_SEARCH,
} from '../constants/search';

import { REVIEW_BY_QUERY } from '../constants/reviews';
import { FRIENDS_SEARCH } from '../constants/friends';

import { LOGOUT } from '../constants/auth';

const initialState = {
  nearbyPlaces: [],
  reviewsSearch: [],
  friendsSearch: null,
  placesSearch: [],
  nearbyLoading: false,
  reviewsLoading: false,
  friendsLoading: false,
  placesLoading: false,
  searchType: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${NEARBY}_REQUEST`:
      return {
        ...state,
        nearbyLoading: true,
      };
    case `${NEARBY}_SUCCESS`:
      return {
        ...state,
        nearbyPlaces: action.places ? action.places.results : initialState.nearbyPlaces,
        nearbyLoading: false,
      };
    case `${GPLACE_SEARCH}_REQUEST`:
      return {
        ...state,
        placesLoading: true,
      };
    case `${GPLACE_SEARCH}_SUCCESS`:
      return {
        ...state,
        placesSearch: action.error ? initialState.placesSearch : action.payload.predictions,
        placesLoading: false,
      };
    case `${REVIEW_BY_QUERY}_REQUEST`:
      return {
        ...state,
        reviewsLoading: true,
      };
    case `${REVIEW_BY_QUERY}_SUCCESS`:
      return {
        ...state,
        reviewsSearch: action.error ? initialState.reviewsSearch : action.payload,
        reviewsLoading: false,
      };
    case `${FRIENDS_SEARCH}_REQUEST`:
      return {
        ...state,
        friendsLoading: true,
      };
    case `${FRIENDS_SEARCH}_SUCCESS`:
      return {
        ...state,
        friendsSearch: action.error ? initialState.friendsSearch : action.payload,
        friendsLoading: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
