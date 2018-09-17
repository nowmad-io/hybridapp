import { sagas as requestsSaga } from '../libs/requests';

import auth from './auth';
import home from './home';

export default [
  auth,
  home,
  requestsSaga,
];
