import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import MapView from 'react-native-maps';
import { Thumbnail } from 'native-base';

import styles from './styles';

const Marker = ({ selected, place }) => {
  console.log('place', place);
  return (
    <View style={styles.wrapper}>
      <View style={styles.shadow}>
        <View style={styles.thumbnailWrapper}>
          <Thumbnail small source={{uri: place.reviews[0].created_by.picture}} />
        </View>
      </View>
      <View style={styles.triangle}/>
    </View>
  )
}

Marker.propTypes = {
  selected: PropTypes.bool,
  place: PropTypes.object,
};

export default Marker;
