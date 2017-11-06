import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import { Icon, View } from 'native-base';

import styles from './styles';

const ImageHolder = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.wrapper}>
      {props.source ? (
        <Image
          style={styles.image}
          source={{uri: props.source}} />
      ) : (
        <Icon name='md-camera' style={styles.icon}/>
      )}
    </View>
  </TouchableOpacity>
)

ImageHolder.defaultProps = {
  onPress: () => {}
}

ImageHolder.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.string,
}

export default ImageHolder;
