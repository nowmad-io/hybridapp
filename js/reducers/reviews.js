import {
  SEARCH_SUCCESS,
} from '../constants/reviews';
import { LOGOUT } from '../constants/auth';

const initialState = {
  all: []
};

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {...state, all: action.payload};
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default reviewsReducer;
