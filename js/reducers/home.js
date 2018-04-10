import { createSelector } from 'reselect';
import _ from 'lodash';

import { getReviews, getPlaces } from './entities';

import { REGION_CHANGE } from '../constants/home';
import { PLACES, ADD_REVIEW, UPDATE_REVIEW } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getRegion = state => state.home.region;

export const selectPlaces = createSelector(
  [getReviews],
  reviews => _.uniq(_.filter(
    reviews,
    review => _.indexOf(review.categories, 1) !== -1,
  ).map(review => review.place)),
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

    return _.compact(placesId.map((id) => {
      const place = places[id];
      if (place.latitude > southWest.latitude && place.latitude < northEast.latitude
          && place.longitude > southWest.longitude && place.longitude < northEast.longitude) {
        return place.id;
      }
      return false;
    }));
  },
);

const initialState = {
  places: [],
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
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
