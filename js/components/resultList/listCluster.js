import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from '../dumbs/text';

import styles from './styles';

const listCluster = (props) => (
  <View>
    <Text style={styles.labelCluster}>{props.label}</Text>
    { props.children }
  </View>
)

listCluster.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
}

export default listCluster;
