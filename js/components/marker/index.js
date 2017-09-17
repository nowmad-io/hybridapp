import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

import styles from './styles';

const Marker = props => (
  <MapView.Marker
    coordinate={{latitude: props.marker.location.latitude, longitude: props.marker.location.longitude}}
    title={props.marker.title}
    description={props.marker.description}
  />
);

Marker.propTypes = {
  marker: PropTypes.object,
};

export default Marker;
