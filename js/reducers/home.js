import {
  GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE
} from '../constants/home';
import {
  PLACES_SUCCESS
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  places: [],
  selectedPlace: null,
  level: 0,
  position: null
};

function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case PLACES_SUCCESS:
      return {
        ...state,
        places: action.payload,
        selectedPlace: action.payload.length ? action.payload[0].id : null
      };
    case SELECTED_PLACE:
      return { ...state, selectedPlace: action.id}
    case LEVEL_CHANGE:
      return { ...state, level: action.level}
    case GEOLOCATION:
      return { ...state, position: action.position}
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default HomeReducer;
