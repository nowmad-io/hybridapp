import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, StyleSheet, PixelRatio, View } from 'react-native';

import Text from './text';
import Icon from './icon';
import { font, colors } from '../../parameters';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    transparent: PropTypes.bool,
    light: PropTypes.bool,
    rounded: PropTypes.bool,
    wrapped: PropTypes.bool,
  };

  render() {
    const {
      onPress, style, rounded, transparent, light, wrapped, fab,
    } = this.props;

    const children = React.Children.map(
      this.props.children,
      child => (child && child.type === Text ?
        React.cloneElement(child, {
          style: [
            styles.text,
            (light && !transparent) && styles.light_text,
          ],
          uppercase: true,
          ...child.props,
        }) : child),
    );

    return (
      <View style={style && style}>
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(colors.ripple)}
        >
          <View style={wrapped && styles.wrapped}>
            <View
              style={[
                styles.button,
                rounded && styles.rounded_button,
                (light || transparent || wrapped) && styles.flat_button,
                light && styles.light_button,
                transparent && styles.transparent_button,
                wrapped && styles.wrapped_button,
              ]}
            >
              {children}
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    backgroundColor: colors.green,
    borderRadius: 2,
    borderColor: colors.green,
    borderWidth: null,
    height: 45,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: font.fontWeight.medium,
    paddingHorizontal: 16,
  },
  rounded_button: {
    borderRadius: 40,
  },
  flat_button: {
    elevation: 0,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
  },
  light_button: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 2 / PixelRatio.getPixelSizeForLayoutSize(1),
  },
  light_text: {
    color: colors.green,
  },
  transparent_button: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: null,
  },
  wrapped: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapped_button: {
    height: 34,
    width: '100%',
  },
});
