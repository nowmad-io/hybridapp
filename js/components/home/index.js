import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

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
        <MapView
          ref={(ref) => { this.mapRef = ref }}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}>
        </MapView>
      </View>
    );
  }
}

function bindAction() {
  return {};
}
const mapStateToProps = null;

export default connect(mapStateToProps, bindAction)(Home);
