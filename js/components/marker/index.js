import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

import styles from './styles';

const Marker = props => (
  <MapView.Marker
    coordinate={{latitude: props.place.latitude, longitude: props.place.longitude}}
    title={props.place.name}
  />
);

Marker.propTypes = {
  place: PropTypes.object,
};

export default Marker;
