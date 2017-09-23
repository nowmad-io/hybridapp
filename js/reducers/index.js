import { crudReducer } from 'redux-crud-store';

import auth from './auth';
import reviews from './reviews';
import nav from './nav';

export default {
  nav,
  auth,
  reviews,
  models: crudReducer
};
