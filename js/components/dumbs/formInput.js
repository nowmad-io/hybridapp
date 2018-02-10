import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';

import Text from './text';

import { colors } from '../../parameters';

export default class FormInput extends Component {
  static propTypes = {
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    onChangeText: () => {},
    placeholder: '',
    maxLength: null,
    multiline: false,
    defaultValue: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      length: 0
    }
  }

  onChangeText(text) {
    this.setState({length: text.length});
    this.props.onChangeText(text);
  }

  render() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          multiline={this.props.multiline}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
          onChangeText={(text) => this.onChangeText(text)} />
        {this.props.maxLength && (
          <Text style={styles.length}>
            {this.state.length ? `${this.state.length}/` : ''}{this.props.maxLength}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 6,
    paddingBottom: 6,
  },
  input: {
    fontSize: 14,
    lineHeight: 16,
    paddingTop: 0,
    paddingBottom: 10
  },
  length: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    fontSize: 10,
    fontWeight: '500',
    color: colors.greyDark
  }
});
