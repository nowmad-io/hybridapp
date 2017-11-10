import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';

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
