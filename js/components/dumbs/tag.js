import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import Text from '../dumbs/text';

import { colors } from '../../parameters';

export default class Tag extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.object,
    selected: PropTypes.bool,
  };

  render() {
    const { onPress, text, selected } =  this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[
          styles.tags,
          selected && styles.selected
        ]}>
            {text ? (
              <Text style={[
                styles.text,
                selected && styles.textSelected
              ]}>
                {text}
              </Text>
            ) : null}
            {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  tags: {
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 28,
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8
  },
  selected: {
    backgroundColor: colors.green,
  },
  text: {
    fontSize: 10,
    color: colors.black,
    lineHeight: 12
  },
  textSelected: {
    color: colors.white
  }
});
