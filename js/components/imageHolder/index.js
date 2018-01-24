import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View } from 'react-native';
import { Icon } from 'native-base';

import styles from './styles';

const ImageHolder = (props) => (
  <TouchableOpacity onPress={props.onPress} style={props.style}>
    <View style={styles.wrapper(!props.source)}>
      {props.source ? (
        <Image
          style={styles.image}
          resizeMethod="resize"
          source={{uri: props.source}} />
      ) : (
        <Icon name='md-camera' style={styles.icon}/>
      )}
    </View>
  </TouchableOpacity>
)

ImageHolder.defaultProps = {
  onPress: () => {},
  style: {}
}

ImageHolder.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.string,
  style: PropTypes.object,
}

export default ImageHolder;
