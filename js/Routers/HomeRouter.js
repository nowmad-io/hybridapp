import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/pages/home';
import DrawBar from '../components/pages/drawBar';

import { sizes } from '../parameters';

const HomeRouter = DrawerNavigator(
  {
    Home,
    DrawBar,
  },
  {
    drawerPosition: 'right',
    contentComponent: props => <DrawBar {...props} />,
    drawerWidth: sizes.drawerWidth,
  },
);

HomeRouter.navigationOptions = () => ({
  header: null,
});

export default HomeRouter;
