import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View } from 'react-native';

import Map from '../map';

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}

function bindAction() {
  return {};
}
const mapStateToProps = null;

export default connect(mapStateToProps, bindAction)(Home);
