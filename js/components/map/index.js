import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

import Marker from '../marker';

import styles from './styles';

const Map = props => (
  <MapView
    ref={(ref) => { this.mapRef = ref }}
    style={styles.map}
    region={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    }}>
    { props.markers && props.markers.map(marker => (
      <Marker
        key={marker.id}
        marker={marker}
      />
    )) }
  </MapView>
);

Map.propTypes = {
  markers: PropTypes.array,
};

export default Map;
