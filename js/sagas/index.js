import auth from './auth';
import friends from './friends';
import reviews from './reviews';
import sockets from './sockets';

export default (socket) => [
  auth,
  reviews,
  friends,
  sockets
].map((saga) => saga(socket));
