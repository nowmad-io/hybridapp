import auth from './auth';
import friends from './friends';
import reviews from './reviews';
import home from './home';
import search from './search';
import sockets from './sockets';

export default (socket) => [
  auth,
  home,
  search,
  reviews,
  friends,
  sockets
].map((saga) => saga(socket));
