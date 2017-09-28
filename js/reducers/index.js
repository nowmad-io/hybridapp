import { crudReducer } from 'redux-crud-store';

import auth from './auth';
import friends from './friends';
import nav from './nav';

export default {
  nav,
  auth,
  friends,
  models: crudReducer
};
