import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet, View } from 'react-native';

import { colors, sizes } from '../../parameters';

export default class LayoutView extends Component {
  static propTypes = {
  	...ViewPropTypes,
  	style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    type: PropTypes.oneOf([
      'header',
      'container',
      'left',
      'right'
    ])
  };

  render() {
    const { style, type } = this.props;

		return (
			<View {...this.props} style={[styles[type], style]}>
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.green,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    paddingTop: sizes.header.paddingTop,
    borderBottomWidth: sizes.header.borderBottomWidth,
    borderBottomColor: colors.green,
    height: sizes.header.height,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9
  },
  container: {
    flex: 1,
    height: sizes.height
  },
  left: {
    flex: 1,
		alignSelf: 'center',
		alignItems: 'flex-start',
  },
  right: {
    flex: 1,
		alignSelf: 'center',
		alignItems: 'flex-end',
  }
});
