import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';

import Text from './text';
import Icon from './icon';

import { colors } from '../../parameters';

export default class FormInput extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    defaultValue: PropTypes.string,
    icon: PropTypes.string,
  }

  static defaultProps = {
    onChangeText: () => {},
    placeholder: '',
    maxLength: null,
    multiline: false,
    defaultValue: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      length: 0,
    };
  }

  onChangeText(text) {
    this.setState({ length: text.length });
    this.props.onChangeText(text);
  }

  render() {
    const { style, icon } = this.props;

    return (
      <View style={[styles.wrapper, style]}>
        <View style={styles.inputWrapper}>
          {icon && (
            <Icon name={icon} style={styles.icon} />
          )}
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            multiline={this.props.multiline}
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            onChangeText={text => this.onChangeText(text)}
          />
        </View>
        {this.props.maxLength && (
          <Text style={styles.length}>
            {this.state.length ? `${this.state.length}/` : ''}
            {this.props.maxLength}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  icon: {
    fontSize: 24,
    color: colors.grey,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  length: {
    alignSelf: 'flex-end',
    marginRight: 4,
    fontSize: 10,
    fontWeight: '500',
    color: colors.greyDark,
  },
});
