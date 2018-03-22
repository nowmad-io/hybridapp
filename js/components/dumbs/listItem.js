import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Text from './text';

import { colors } from '../../parameters';

const googleImage = require('../../../assets/images/icons/google.png');
const placeImage = require('../../../assets/images/icons/place.png');

export default class List extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    onPress: PropTypes.func,
    text: PropTypes.string,
    secondaryText: PropTypes.string,
    thumbnail: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const {
      children, onPress, image, text, secondaryText, thumbnail,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapper}>
          { image === 'google' && (
            <Image source={googleImage} style={styles.image} />
          )}
          { image === 'place' && (
            <Image source={placeImage} style={styles.image} />
          )}
          { image === 'friend' && (
            <Image source={{ uri: thumbnail }} style={styles.image} />
          )}

          <View style={styles.textWrapper}>
            <Text>{text}</Text>
            {secondaryText && (
              <Text style={styles.secondaryText}> - {secondaryText}</Text>
            )}
            {children}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 12,
    borderRadius: 50,
  },
  textWrapper: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 16,
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    paddingVertical: 12,
  },
  secondaryText: {
    color: colors.grey,
  },
});
