import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import Friends from '../components/friends';
import DrawBar from '../components/drawBar';
import AddReview from '../components/addReview';
import MapList from '../components/mapList/AnimatedViews';

import { runSagas, stopSagas } from '../actions/utils';

const AppNavigator = DrawerNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  AddReview: { screen: AddReview },
  MapList: { screen: MapList }
},
{
  contentComponent: props => <DrawBar {...props} />,
});

class AppRouter extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.dispatch(runSagas());
  }

  componentWillUnmount() {
    this.props.dispatch(stopSagas());
  }

  render() {
    return <AppNavigator />
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = null;

export default connect(mapStateToProps, bindActions)(AppRouter);
