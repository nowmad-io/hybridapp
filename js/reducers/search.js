import {
  NEARBY
} from '../constants/search';

import { LOGOUT } from '../constants/auth';

const initialState = {
  nearbyPlaces: [],
};

function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case NEARBY:
      return { ...state, nearbyPlaces: action.places.results };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default SearchReducer;
