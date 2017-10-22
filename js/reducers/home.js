import {
  GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE,
  REGION_CHANGE
} from '../constants/home';
import {
  PLACES_SUCCESS
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  places: [],
  selectedPlace: null,
  level: 0,
  position: null,
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
