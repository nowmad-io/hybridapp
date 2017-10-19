import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import MapView from 'react-native-maps';

import styles from './styles';

const Marker = props => (
  <MapView.Marker
    coordinate={{latitude: props.place.latitude, longitude: props.place.longitude}}
  >
    <Text>{props.selectedPlace === props.place.id ? 'YO' : 'yo'}</Text>
  </MapView.Marker>
);

Marker.propTypes = {
  place: PropTypes.object,
  selectedPlace: PropTypes.number,
  level: PropTypes.number
};

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  selectedPlace: state.home.selectedPlace,
  level: state.home.level
});

export default connect(mapStateToProps, bindActions)(Marker);
