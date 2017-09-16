import { crudReducer } from 'redux-crud-store';

import auth from './auth';
import reviews from './reviews';
import drawer from './drawer';

export default {
  drawer,
  auth,
  reviews,
  models: crudReducer
};
