import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';

export default class Thumbnail extends PureComponent {
  static propTypes = {
    ...Image.propTypes,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array]),
    square: PropTypes.bool,
    xsmall: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
  }

  render() {
    const {
      style, square, xsmall, small, large,
    } = this.props;

    return (
      <Image
        {...this.props}
        style={[
          styles.thumbnail,
          square && styles.square,
          xsmall && styles.xsmall,
          small && styles.small,
          large && styles.large,
          style && style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  square: {
    borderRadius: 0,
  },
  xsmall: {
    width: 18,
    height: 18,
  },
  small: {
    width: 24,
    height: 24,
  },
  large: {
    width: 80,
    height: 80,
  },
});
