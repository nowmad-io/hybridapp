import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';

import Icon from './icon';

import { colors } from '../../parameters';

export default class ImageHolder extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
  };

  render() {
    const { onPress, style, source } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <View style={[
          styles.wrapper,
          !source && styles.empty,
        ]}
        >
          {source ? (
            <Image
              style={styles.image}
              resizeMethod="resize"
              source={{ uri: source }}
            />
          ) : (
            <Icon name="add-a-photo" style={styles.icon} />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 58,
    width: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    borderColor: colors.green,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 24,
    color: colors.green,
  },
});
