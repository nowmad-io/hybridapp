import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';

import Text from './text';
import Icon from './icon';

import { colors } from '../../parameters';

export default class Avatar extends PureComponent {
  static propTypes = {
    style: PropTypes.any,
    textStyle: PropTypes.any,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    uri: PropTypes.string,
    uppercase: PropTypes.bool,
    size: PropTypes.number,
    icon: PropTypes.string,
    set: PropTypes.string,
  };

  static defaultProps = {
    size: 40,
    uppercase: true,
  }

  render() {
    const {
      style, textStyle, size, text, uppercase, icon, set, uri,
    } = this.props;

    return (
      <View
        style={[
          styles.avatar,
          uri && styles.avatarWithImage,
          {
            width: size,
            height: size,
          },
          style,
        ]}
      >
        {icon ? (
          <Icon
            set={set}
            name={icon}
            style={[
              styles.text,
              textStyle,
            ]}
          />
        ) : uri ? (
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
            resizeMethode="resize"
          />
        ) : (
          <Text
            style={[
              styles.text,
              textStyle,
            ]}
            uppercase={uppercase}
          >
            {text}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarWithImage: {
    borderWidth: 0,
  },
  text: {
    color: colors.green,
    fontSize: 20,
    lineHeight: 26,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
