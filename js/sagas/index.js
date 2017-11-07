import auth from './auth';
import friends from './friends';
import reviews from './reviews';
import home from './home';
import sockets from './sockets';

export default (socket) => [
  auth,
  home,
  reviews,
  friends,
  sockets
].map((saga) => saga(socket));
