import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import Friends from '../components/friends';
import DrawBar from '../components/drawBar';

const AppNavigator = DrawerNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
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
    console.log('WillMount');
  }

  componentWillUnmount() {
    console.log('WillUnmount');
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
