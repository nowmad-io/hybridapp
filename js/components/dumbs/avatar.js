import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Text from './text';

import { colors } from '../../parameters';

export default class Avatar extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    uppercase: PropTypes.bool,
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 40,
    uppercase: true,
  }

  render() {
    const {
      style, textStyle, size, text, uppercase,
    } = this.props;

    return (
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
          },
          style && style,
        ]}
      >
        <Text
          style={[
            styles.text,
            textStyle && textStyle,
          ]}
          uppercase={uppercase}
        >
          {text}
        </Text>
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
  },
  text: {
    color: colors.green,
    fontSize: 20,
    lineHeight: 26,
  },
});
