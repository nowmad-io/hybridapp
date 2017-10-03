import {
  SEARCH_SUCCESS,
} from '../constants/reviews';

const initialState = {
  all: []
};

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {...state, all: action.payload};
    default:
      return state;
  }
}

export default reviewsReducer;
