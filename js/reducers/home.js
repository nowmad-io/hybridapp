import {
  GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE,
  REGION_CHANGE,
  NEARBY,
  NEW_PLACE
} from '../constants/home';
import {
  PLACES_SUCCESS,
  ADD_UPDATE_REVIEW,
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  places: [],
  selectedPlace: null,
  level: 0,
  position: null,
  nearbyPlaces: [],
  region: {
    latitude: 40.7205699,
    longitude: -1.840341,
    latitudeDelta: 50,
    longitudeDelta: 50
  }
};

function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case PLACES_SUCCESS:
      return {
        ...state,
        places: action.payload,
        selectedPlace: action.payload.length ? action.payload[0] : null
      };
    case ADD_UPDATE_REVIEW:
      console.log('action.review', action.review);
      console.log('state.places', state.places);
      return state;
    case NEW_PLACE:
      console.log('NEW_PLACE', action);
      return { ...state, newPlace: action.place };
    case NEARBY:
      return { ...state, nearbyPlaces: action.places.results };
    case SELECTED_PLACE:
      return { ...state, selectedPlace: action.selectedPlace};
    case GEOLOCATION:
      return { ...state, position: action.position};
    case LEVEL_CHANGE:
      return { ...state, level: action.level};
    case REGION_CHANGE:
      return { ...state, position: action.region};
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default HomeReducer;
