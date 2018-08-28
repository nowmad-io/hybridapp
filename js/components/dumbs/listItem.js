import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';

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
      PropTypes.number,
    ]),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onPress: () => false,
  }

  render() {
    const {
      children, onPress, text, secondaryText, thumbnail, disabled,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.8 : 1}
        onPress={onPress}
        style={styles.wrapper}
      >
        { thumbnail && (
          <Image
            source={thumbnail}
            style={[
              styles.image,
              disabled && styles.image_disabled,
            ]}
          />
        )}
        <LayoutView type="wrapper">
          <Text style={disabled && styles.secondaryText}>
            {text}
          </Text>
          {secondaryText && (
            <Text style={styles.secondaryText}>
              {' - '}
              {secondaryText}
            </Text>
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
    marginBottom: 18,
  },
  image_disabled: {
    opacity: 0.5,
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
