import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import MapView from 'react-native-maps';

import styles from './styles';

const Marker = props => (
  <Text>{props.selected ? 'YO' : 'yo'}</Text>
);

Marker.propTypes = {
  selected: PropTypes.bool,
};

export default Marker;
