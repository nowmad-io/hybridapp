import { createSelector } from 'reselect';
import _ from 'lodash';

import { getReviews, getPlaces } from './entities';

import {
  REGION_CHANGE,
  FILTERS_CHANGE,
  PLACE_SELECT,
  NEW_PLACE,
} from '../constants/home';
import { ADD_REVIEW, UPDATE_REVIEW } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getRegion = state => state.home.region;
const getFilters = state => state.home.filters;

export const selectPlaces = createSelector(
  [getReviews, getFilters, getPlaces],
  (reviews, filters, places) => (_.uniq(_.filter(
    reviews,
    review => (
      (filters.friend ? review.created_by === filters.friend : true)
      && (filters.categories.length ?
        _.intersection(review.categories, filters.categories).length : true)
    ),
  ).map(review => places[review.place]))),
);

export const selectVisiblePlaces = createSelector(
  [selectPlaces, getRegion],
  (places, region) => {
    const southWest = {
      latitude: region.latitude - region.latitudeDelta / 2,
      longitude: region.longitude - region.longitudeDelta / 2,
    };

    const northEast = {
      latitude: region.latitude + region.latitudeDelta / 2,
      longitude: region.longitude + region.longitudeDelta / 2,
    };

    return _.filter(places, (place) => {
      if (place.latitude > southWest.latitude && place.latitude < northEast.latitude
          && place.longitude > southWest.longitude && place.longitude < northEast.longitude) {
        return true;
      }
      return false;
    });
  },
);

const initialState = {
  filters: {
    categories: [],
    friend: null,
  },
  geolocation: {
    loading: false,
    location: null,
  },
  region: {
    longitudeDelta: 126.56254928559065,
    latitudeDelta: 114.96000427333595,
    longitude: 5.266113225370649,
    latitude: 20.476854784243514,
  },
  addingReview: false,
  selectedPlace: {},
  newPlace: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_REVIEW}_REQUEST`:
    case `${UPDATE_REVIEW}_REQUEST`:
      return {
        ...state,
        addingReview: true,
      };
    case `${ADD_REVIEW}_SUCCESS`:
    case `${ADD_REVIEW}_ERROR`:
    case `${UPDATE_REVIEW}_SUCCESS`:
    case `${UPDATE_REVIEW}_ERROR`:
      return {
        ...state,
        addingReview: false,
      };
    case REGION_CHANGE:
      return {
        ...state,
        region: action.region,
      };
    case FILTERS_CHANGE: {
      return {
        ...state,
        filters: {
          categories: action.categories || state.filters.categories,
          friend: action.friend !== undefined ? action.friend : state.filters.friend,
        },
      };
    }
    case PLACE_SELECT:
      return {
        ...state,
        selectedPlace: action.place,
      };
    case NEW_PLACE:
      return {
        ...state,
        newPlace: action.place,
      };
    case `${LOGOUT}_REQUEST`:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
