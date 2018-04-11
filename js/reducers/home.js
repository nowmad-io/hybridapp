import { createSelector } from 'reselect';
import _ from 'lodash';

import { getReviews, getPlaces } from './entities';

import { REGION_CHANGE, LEVEL_CHANGE, FILTERS_CHANGE } from '../constants/home';
import { PLACES, ADD_REVIEW, UPDATE_REVIEW } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getRegion = state => state.home.region;
const getFilters = state => state.home.filters;
const getHomePlaces = state => state.home.places;

export const selectPlaces = createSelector(
  [getReviews, getFilters, getHomePlaces],
  (reviews, filters, places) => (filters.categories.length ? _.uniq(_.filter(
    reviews,
    review => _.intersection(review.categories, filters.categories).length,
  ).map(review => review.place)) : places),
);

export const selectVisiblePlaces = createSelector(
  [selectPlaces, getPlaces, getRegion],
  (placesId, places, region) => {
    const southWest = {
      latitude: region.latitude - region.latitudeDelta / 2,
      longitude: region.longitude - region.longitudeDelta / 2,
    };

    const northEast = {
      latitude: region.latitude + region.latitudeDelta / 2,
      longitude: region.longitude + region.longitudeDelta / 2,
    };

    return _.filter(placesId, (id) => {
      const place = places[id];
      if (place.latitude > southWest.latitude && place.latitude < northEast.latitude
          && place.longitude > southWest.longitude && place.longitude < northEast.longitude) {
        return true;
      }
      return false;
    });
  },
);

const initialState = {
  places: [],
  filters: {
    categories: [],
  },
  level: 1,
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
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${PLACES}_SUCCESS`:
      return {
        ...state,
        places: action.payload.result,
      };
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
    case LEVEL_CHANGE:
      return {
        ...state,
        level: action.level,
      };
    case FILTERS_CHANGE:
      return {
        ...state,
        filters: {
          categories: action.categories,
        },
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
