import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Text from './text';

import { colors } from '../../parameters';

export default class List extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    const { children, style, label } = this.props;

    return (
      <View
        {...this.props}
        style={[styles.listContainer, style && style]}
      >
        {label && (
          <Text uppercase style={styles.label}>
            {label}
          </Text>
        )}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 24,
    backgroundColor: colors.white,
  },
  label: {
    paddingHorizontal: 16,
    color: colors.grey,
  },
});
