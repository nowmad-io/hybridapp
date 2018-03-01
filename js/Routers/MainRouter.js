import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import _ from "lodash";

import Login from '../components/pages/auth/login';
import Register from '../components/pages/auth/register';
import AppRouter from './AppRouter';

export const MainNavigator = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  App: { screen: AppRouter },
});

class MainRouter extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    addListener: PropTypes.func.isRequired
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    const indexes = _.flattenDeep(this.navIndex(nav));

    if (!indexes.some((index) => index)) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  navIndex(nav) {
    if (nav.hasOwnProperty('routes')) {
      return [
        nav.index,
        nav.routes.map((route) => {
          return this.navIndex(route);
        })
      ]
    }
  }

  render() {
    const { dispatch, nav, addListener } = this.props;

    return (
      <MainNavigator navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener
        })} />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(MainRouter);
