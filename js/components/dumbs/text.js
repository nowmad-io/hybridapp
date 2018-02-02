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
    ]),
    note: PropTypes.bool
  };

  render() {
    const { uppercase, capitalize, style, children, note } = this.props;

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
      <RNText { ...this.props } style={[styles.text, note && styles.note, style]}>
        { text }
      </RNText>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: font.fontFamily,
    fontSize: 16,
    fontWeight: font.fontWeight.regular,
    fontStyle: font.fontStyle.normal,
    color: colors.black,
    lineHeight: 16
  },
  note: {
    color: colors.greyDark,
    marginTop: 8
  }
});
