import auth from './auth';
import friends from './friends';
import home from './home';
import sockets from './sockets';

export default (socket) => [
  auth,
  home,
  friends,
  sockets
].map((saga) => saga(socket));
