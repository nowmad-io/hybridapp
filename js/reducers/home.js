import {
  GEOLOCATION
} from '../constants/home';
import {
  SEARCH_SUCCESS
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  reviews: [],
  position: null
};

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {...state, reviews: action.payload};
    case GEOLOCATION:
      return { ...state, position: action.position}
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default reviewsReducer;
