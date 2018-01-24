import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet, View } from 'react-native';

import { sizes } from '../../parameters';

export default class Container extends Component {
  static propTypes = {
  	...ViewPropTypes,
  	style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
  };

  render() {
    const { style } = this.props;

		return (
			<View {...this.props} style={[styles.container, style]}>
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: sizes.height
  }
});
