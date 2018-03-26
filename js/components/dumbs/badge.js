import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Text from './text';

import { colors, font } from '../../parameters';

export default class Badge extends PureComponent {
  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  render() {
    const { text } = this.props;

    return (
      <View style={[styles.badge]}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.green,
    borderRadius: 50,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: font.fontWeight.medium,
  },
});
