import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from "react-native";
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import _ from "lodash";

import Login from '../components/login/';
import AppRouter from './AppRouter';

export const MainNavigator = StackNavigator({
  Login: { screen: Login },
  App: { screen: AppRouter },
});


class MainRouter extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
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
    const { dispatch, nav } = this.props;

    return <MainNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(MainRouter);
