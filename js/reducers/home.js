import _ from 'lodash';

import {
  GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE,
  REGION_CHANGE,
  NEARBY,
  NEW_PLACE,
  CURRENT_PLACES,
  GOOGLE_PLACE,
  SEARCHED_PLACES,
  FROM_REVIEW
} from '../constants/home';
import {
  PLACES_SUCCESS,
  UPDATE_REVIEW,
  ADD_REVIEW,
  REVIEW_LOADING,
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
  position: null,
  region: null,
  reviewLoading: false,
  fromReview: false,
};

function updateReview(currentPlaces, place, updatedReview) {
  return currentPlaces.map((currentPlace) => {
    if (currentPlace.id === place.id) {
      return {
        ...place,
        reviews: currentPlace.reviews.map((review) => {
          return (review.id === updatedReview.id) ? updatedReview : review;
        })
      }
    }
    return currentPlace;
  })
}

function HomeReducer(state = initialState, action) {
  const { place, ...review } = action.review || {};

  switch (action.type) {
    case FROM_REVIEW:
      return {
        ...state,
        fromReview: action.from
      }
    case REVIEW_LOADING:
      return {
        ...state,
        reviewLoading: action.loading
      }
    case PLACES_SUCCESS:
      return {
        ...state,
        places: _.compact([state.googlePlace, ...action.payload]),
        selectedPlace: action.payload.length ? action.payload[0] : null
      };
    case ADD_REVIEW:
      let exist = false;

      const newPlaces_addreview = state.places.map((statePlace) => {
        if (statePlace.id === place.id) {
          exist = true;
          return {
            ...statePlace,
            reviews: [review, ...statePlace.reviews],
            selectedPlace: review,
          };
        }

        return statePlace;
      });

      return {
        ...state,
        newPlace: initialState.newPlace,
        searchedPlaces: initialState.searchedPlaces,
        selectedPlace: { ...place, reviews: [review] },
        places: exist ? newPlaces_addreview : [{ ...place, reviews: [review] }, ...state.places],
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        places: updateReview(state.places, place, review),
        currentPlaces: updateReview(state.currentPlaces, place, review),
      };
    case NEW_PLACE:
      let extras = {};
      if (!action.place) {
        extras.nearbyPlaces = [];
      }
      return {
        ...state,
        newPlace: action.place,
        selectedPlace: action.place,
        ...extras
      };
    case GOOGLE_PLACE:
      let newPlaces = _.compact([action.place, ...state.places]),
          newCurrentPlaces = _.compact([action.place, ...state.currentPlaces])

      if (!action.place) {
        newPlaces = _.filter(state.places, (place) => state.googlePlace.id !== place.id);
        newCurrentPlaces = _.filter(state.currentPlaces, (currentPlace) => state.googlePlace.id !== currentPlace.id);
      }

      return {
        ...state,
        newPlace: null,
        searchedPlaces: initialState.searchedPlaces,
        googlePlace: action.place,
        places: newPlaces,
        currentPlaces: newCurrentPlaces,
        selectedPlace: action.place,
      }
    case SEARCHED_PLACES:
      return {
        ...state,
        searchedPlaces: action.places || action.payload || initialState.searchedPlaces
      };
    case NEARBY:
      return { ...state, nearbyPlaces: action.places.results };
    case SELECTED_PLACE:
      return { ...state, selectedPlace: action.selectedPlace};
    case GEOLOCATION:
      return { ...state, position: action.position};
    case LEVEL_CHANGE:
      return { ...state, level: action.level};
    case REGION_CHANGE:
      return { ...state, region: action.region};
    case CURRENT_PLACES:
      return {
        ...state,
        currentPlaces: action.places,
        selectedPlace: action.places.length ? action.places[0] : {}
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default HomeReducer;