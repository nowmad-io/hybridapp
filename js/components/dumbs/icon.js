import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

import { font, colors } from '../../parameters';

export default class Icon extends Component {
  static propTypes = {
  	style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
  };

  render() {
    const { style } = this.props;

		return <MaterialIcon {...this.props} style={[styles.icon, style]} />;
	}
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    color: colors.black
  }
});
