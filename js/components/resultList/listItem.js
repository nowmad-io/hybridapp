import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import { Text, View } from 'native-base';

import styles from './styles';

const ListItem = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.itemWrapper(props.other)}>
      { props.image === 'google' && (
        <Image source={require('../../../assets/images/icons/google.png')} style={styles.imageItem} />
      )}
      { props.image === 'place' && (
        <Image source={require('../../../assets/images/icons/place.png')} style={styles.imageItem} />
      )}
      { props.image === 'friend' && (
        <View>
          <Image source={{uri: props.thumbnail}} style={[styles.imageItem, styles.thumbnail]} />
        </View>
      )}
      <View style={styles.textWrapperItem}>
        <Text style={styles.textItem}>{props.text}</Text>
        {props.secondaryText && (
          <Text style={styles.secondaryTextItem}> - {props.secondaryText}</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
)

ListItem.defaultProps = {
  onPress: () => true
}

ListItem.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  secondaryText: PropTypes.string,
  other: PropTypes.bool,
  children: PropTypes.array,
  onPress: PropTypes.func,
}

export default ListItem;
