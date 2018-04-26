import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import Text from './text';
import LayoutView from './layoutView';

import { colors } from '../../parameters';

export default class List extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.any,
    ]),
    onPress: PropTypes.func,
    text: PropTypes.string,
    secondaryText: PropTypes.string,
    thumbnail: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  };

  render() {
    const {
      children, onPress, text, secondaryText, thumbnail,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        { thumbnail && (
          <Image source={thumbnail} style={styles.image} />
        )}
        <LayoutView type="wrapper">
          <Text>{text}</Text>
          {secondaryText && (
            <Text style={styles.secondaryText}> - {secondaryText}</Text>
          )}
        </LayoutView>

        <View>
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 18,
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 12,
    borderRadius: 50,
  },
  secondaryText: {
    color: colors.grey,
  },
});
