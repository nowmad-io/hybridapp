import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View } from 'react-native';

import Text from '../dumbs/text';

import styles from './styles';

const googleImage = require('../../../assets/images/icons/google.png');
const placeImage = require('../../../assets/images/icons/place.png');

const ListItem = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.itemWrapper(props.other)}>
      { props.image === 'google' && (
        <Image source={googleImage} style={styles.imageItem} />
      )}
      { props.image === 'place' && (
        <Image source={placeImage} style={styles.imageItem} />
      )}
      { props.image === 'friend' && (
        <View>
          <Image source={{ uri: props.thumbnail }} style={[styles.imageItem, styles.thumbnail]} />
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
);

ListItem.defaultProps = {
  onPress: () => true,
};

ListItem.propTypes = {
  thumbnail: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  secondaryText: PropTypes.string,
  other: PropTypes.bool,
  onPress: PropTypes.func,
};

export default ListItem;
