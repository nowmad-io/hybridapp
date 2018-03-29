import _ from 'lodash';

import {
  GET_GEOLOCATION,
  SET_GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE,
  REGION_CHANGE,
  NEARBY,
  NEW_PLACE,
  CURRENT_PLACES,
  GOOGLE_PLACE,
  SEARCHED_PLACES,
} from '../constants/home';
import {
  PLACES,
  UPDATE_REVIEW,
  ADD_REVIEW,
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  places: [],
  currentPlaces: [],
  searchedPlaces: [],
  selectedPlace: null,
  newPlace: null,
  googlePlace: null,
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
  fromReview: false,
};

function updateReview(currentPlaces, place, updatedReview) {
  return currentPlaces.map((currentPlace) => {
    if (currentPlace.id === place.id) {
      return {
        ...place,
        reviews: currentPlace.reviews.map(review => (
          (review.id === updatedReview.id) ? updatedReview : review)),
      };
    }
    return currentPlace;
  });
}

const homeReducer = (state = initialState, action) => {
  const { place, ...review } = action.review || {};

  switch (action.type) {
    case `${PLACES}_SUCCESS`:
      return {
        ...state,
        places: _.compact([state.googlePlace, ...action.payload]),
        selectedPlace: action.payload.length ? action.payload[0] : null,
      };
    case `${ADD_REVIEW}_REQUEST`:
      return {
        ...state,
        addingReview: true,
      };
    case `${ADD_REVIEW}_SUCCESS`: {
      let placeExist = false;

      const updatedPlaces = state.places.map((pl) => {
        if (pl.id === place.id) {
          placeExist = true;

          return {
            ...pl,
            reviews: [review, ...pl.reviews],
          };
        }

        return pl;
      });

      return {
        ...state,
        newPlace: initialState.newPlace,
        searchedPlaces: initialState.searchedPlaces,
        selectedPlace: { ...place, reviews: [review] },
        places: placeExist ? updatedPlaces : [{ ...place, reviews: [review] }, ...state.places],
      };
    }
    case `${UPDATE_REVIEW}_SUCCESS`:
      return {
        ...state,
        places: updateReview(state.places, place, review),
        currentPlaces: updateReview(state.currentPlaces, place, review),
      };
    case NEW_PLACE: {
      const extras = {};
      if (!action.place) {
        extras.nearbyPlaces = [];
      }
      return {
        ...state,
        newPlace: action.place,
        selectedPlace: action.place,
        ...extras,
      };
    }
    case GOOGLE_PLACE: {
      const places = state.googlePlace ? state.places.slice(1) : state.places;
      let newPlaces = _.compact([action.place, ...places]);
      const currentPlaces = state.googlePlace ? state.currentPlaces.slice(1) : state.currentPlaces;
      let newCurrentPlaces = _.compact([action.place, ...currentPlaces]);

      if (!action.place) {
        newPlaces = _.filter(state.places, pl => state.googlePlace.id !== pl.id);
        newCurrentPlaces = _.filter(
          state.currentPlaces,
          currentPlace => state.googlePlace.id !== currentPlace.id,
        );
      }

      return {
        ...state,
        newPlace: null,
        searchedPlaces: initialState.searchedPlaces,
        googlePlace: action.place,
        places: newPlaces,
        currentPlaces: newCurrentPlaces,
        selectedPlace: action.place,
      };
    }
    case SEARCHED_PLACES:
      return {
        ...state,
        searchedPlaces: action.places || action.payload || initialState.searchedPlaces,
      };
    case NEARBY:
      return { ...state, nearbyPlaces: action.places.results };
    case SELECTED_PLACE:
      return { ...state, selectedPlace: action.selectedPlace };
    case GET_GEOLOCATION:
      return {
        ...state,
        geolocation: {
          ...state.geolocation,
          loading: true,
        },
      };
    case SET_GEOLOCATION:
      return {
        ...state,
        geolocation: {
          loading: false,
          location: action.position,
        },
      };
    case LEVEL_CHANGE:
      return { ...state, level: action.level };
    case REGION_CHANGE:
      return { ...state, region: action.region };
    case CURRENT_PLACES: {
      let selectedPlace = action.places.length ? action.places[0] : null;

      if (state.selectedPlace && _.find(
        action.places,
        plc => plc.id === state.selectedPlace.id,
      )) {
        ({ selectedPlace } = state.selectedPlace);
      }

      return {
        ...state,
        selectedPlace,
        currentPlaces: action.places,
      };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default homeReducer;
