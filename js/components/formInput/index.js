import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';

class FormInput extends Component {
  static propTypes = {
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
  }

  static defaultProps = {
    onChangeText: () => {},
    placeholder: '',
    maxLength: null,
    multiline: false
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
export default FormInput;
