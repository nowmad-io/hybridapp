import {
  NEARBY,
  FOCUS
} from '../constants/search';

import { LOGOUT } from '../constants/auth';

const initialState = {
  nearbyPlaces: [],
  focused: false
};

function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case NEARBY:
      return { ...state, nearbyPlaces: action.places.results };
    case FOCUS:
      return { ...state, focus: action.focus };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default SearchReducer;
