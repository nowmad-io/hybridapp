import { crudReducer } from 'redux-crud-store';

import auth from './auth';
import reviews from './reviews';
import nav from './nav';
import drawer from './drawer';

export default {
  nav,
  drawer,
  auth,
  reviews,
  models: crudReducer
};
