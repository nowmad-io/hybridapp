import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Text from './text';
import LayoutView from './layoutView';

import { colors } from '../../parameters';

export default class List extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    styleWrapper: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    label: PropTypes.string,
  };

  render() {
    const {
      children, style, styleWrapper, label,
    } = this.props;

    return (
      <View style={[styles.wrapper, styleWrapper]}>
        {label && (
          <Text uppercase style={styles.label}>
            {label}
          </Text>
        )}
        <View
          {...this.props}
          style={[styles.listContainer, style && style]}
        >
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  listContainer: {
    backgroundColor: colors.white,
  },
  label: {
    paddingHorizontal: 16,
    color: colors.grey,
  },
});
