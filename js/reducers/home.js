import { createSelector } from 'reselect';
import _ from 'lodash';

import { getPlaces } from './entities';

import { PLACES, ADD_REVIEW, UPDATE_REVIEW } from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const getListPlaces = state => state.home.places;

export const selectPlaces = createSelector(
  [getListPlaces],
  places => places,
);

export const selectVisiblePlaces = createSelector(
  [getPlaces, (state, region) => region],
  (places, region) => {
    const southWest = {
      latitude: region.latitude - region.latitudeDelta / 2,
      longitude: region.longitude - region.longitudeDelta / 2,
    };

    const northEast = {
      latitude: region.latitude + region.latitudeDelta / 2,
      longitude: region.longitude + region.longitudeDelta / 2,
    };

    return _.compact(_.map(places, (place) => {
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
  initialRegion: {
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
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
