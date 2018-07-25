import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, StyleSheet, PixelRatio, View,
} from 'react-native';

import Text from './text';
import Icon from './icon';
import { font, colors } from '../../parameters';

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    iconStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    buttonStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    transparent: PropTypes.bool,
    light: PropTypes.bool,
    rounded: PropTypes.bool,
    wrapped: PropTypes.bool,
    header: PropTypes.bool,
    fab: PropTypes.bool,
    icon: PropTypes.string,
  };

  render() {
    const {
      onPress,
      style,
      iconStyle,
      buttonStyle,
      rounded,
      transparent,
      light,
      wrapped,
      fab,
      icon,
      header,
    } = this.props;

    const children = React.Children.map(
      this.props.children,
      (child) => {
        if (!child) {
          return child;
        }

        const { style: childStyle, ...childProps } = child.props;
        let newProps = { style: {} };

        switch (child.type) {
          case Text: {
            newProps = {
              style: [
                (light && !transparent) && styles.light_text,
                fab && fab && styles.fab_text,
              ],
              uppercase: true,
            };
            break;
          }
          case Icon: {
            newProps.style = [
              (React.Children.count(this.props.children) > 1) && styles.icon,
              fab && fab && styles.fab_icon,
            ];
            break;
          }
          default:
            break;
        }

        newProps.style = [
          styles.text,
          ...newProps.style,
          childStyle,
        ];

        return React.cloneElement(child, { ...newProps, ...childProps });
      },
    );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.wrapper,
          (fab || rounded) && styles.rounded,
          fab && styles.fab,
          (fab && icon) && { width: 56 },
          wrapped && styles.wrapped,
          (light || fab) && styles.light_button,
          transparent && styles.transparent_button,
          header && { paddingHorizontal: 8 },
          style && style,
        ]}
      >
        <View
          style={[
            styles.button,
            wrapped && styles.wrapped_button,
            buttonStyle && buttonStyle,
          ]}
        >
          {children}
          {icon && (
            <Icon
              name={icon}
              style={[
                styles.text,
                { fontSize: 22 },
                fab && styles.fab_icon,
                iconStyle && iconStyle,
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    backgroundColor: colors.green,
    borderColor: colors.green,
    borderRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: colors.white,
    fontWeight: font.fontWeight.medium,
  },
  icon: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 4,
  },
  fab: {
    ...colors.blackShadow,
    height: 56,
  },
  fab_text: {
    color: colors.black,
    fontSize: 14,
  },
  fab_icon: {
    color: colors.greyButton,
  },
  rounded: {
    borderRadius: 40,
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
    height: 32,
    width: '100%',
    backgroundColor: colors.green,
    borderColor: colors.green,
    borderRadius: 2,
    paddingHorizontal: 16,
  },
});
