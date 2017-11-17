import {
  NEARBY,
  NEARBY_LOADING,
  FOCUS,
  SEARCH_TYPE,
  PLACES_SEARCH,
  PLACES_SEARCH_ERROR,
  PLACES_LOADING,
  REVIEWS_SEARCH,
  REVIEWS_SEARCH_ERROR,
  REVIEWS_LOADING,
  FRIENDS_SEARCH,
  FRIENDS_SEARCH_ERROR,
  FRIENDS_LOADING
} from '../constants/search';

import { LOGOUT } from '../constants/auth';

const initialState = {
  nearbyPlaces: [],
  reviewsSearch: [],
  friendsSearch: [],
  placesSearch: [],
  nearbyLoading: true,
  reviewsLoading: true,
  friendsLoading: true,
  placesLoading: true,
  focused: false,
  searchType: null
};

function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case NEARBY:
      return {
        ...state,
        nearbyPlaces: action.places ? action.places.results : initialState.nearbyPlaces,
        nearbyLoading: false
      };
    case PLACES_SEARCH_ERROR:
    case PLACES_SEARCH:
      return {
        ...state,
        placesSearch: action.places || initialState.placesSearch,
        placesLoading: false
      };
    case REVIEWS_SEARCH_ERROR:
    case REVIEWS_SEARCH:
      return {
        ...state,
        reviewsSearch: action.error ? initialState.reviewsSearch : action.payload,
        reviewsLoading: false
      };
    case FRIENDS_SEARCH_ERROR:
    case FRIENDS_SEARCH:
      return {
        ...state,
        friendsSearch: action.error ? initialState.friendsSearch : action.payload,
        friendsLoading: false
      };
    case NEARBY_LOADING:
      return {
        ...state,
        nearbyLoading: action.loading
      }
    case FRIENDS_LOADING:
      return {
        ...state,
        friendsLoading: action.loading
      }
    case REVIEWS_LOADING:
      return {
        ...state,
        reviewsLoading: action.loading
      }
    case PLACES_LOADING:
      return {
        ...state,
        placesLoading: action.loading
      }
    case SEARCH_TYPE:
      return {
        ...state,
        searchType: action.typeSearch,
      };
    case FOCUS:
      return { ...state, focused: action.focused };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default SearchReducer;
