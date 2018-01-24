import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, StyleSheet } from "react-native";
import _ from "lodash";

import { font, colors } from '../../parameters';

export default class Text extends Component {
  static propTypes = {
  	...RNText.propTypes,
  	uppercase: PropTypes.bool,
  	capitalize: PropTypes.bool,
  	style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
  };

  static defaultProps = {
  	uppercase: false,
  	capitalize: false
  };

  render() {
    const { uppercase, capitalize, style, children } = this.props;

    let text;
    if (uppercase || capitalize) {
      text = React.Children.map(children, child => {
        if (_.isString(child)) {
          return uppercase ? _.toUpper(child) : _.upperFirst(child);
        } else {
          return child;
        }
      })
    } else {
      text = children;
    }

    return (
      <RNText { ...this.props } style={[styles.text, style]}>
        { text }
      </RNText>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: font.fontFamily,
    fontSize: font.fontSize.text,
    fontWeight: font.fontWeight.regular,
    fontStyle: font.fontStyle.normal,
    color: colors.black
  }
});
