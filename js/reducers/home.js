import {
  GEOLOCATION
} from '../constants/home';
import {
  PLACES_SUCCESS
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  places: [],
  position: null
};

function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case PLACES_SUCCESS:
      return {...state, places: action.payload};
    case GEOLOCATION:
      return { ...state, position: action.position}
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default HomeReducer;
