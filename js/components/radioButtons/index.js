import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Radio, Text } from 'native-base';

import styles from './styles';

class RadioButtons extends Component {
  static propTypes = {
    list: PropTypes.array,
    onSelect: PropTypes.func,
    index: PropTypes.number
  }

  static defaultProps = {
    onSelect: () => {},
    index: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: props.index
    }
  }

  onSelect(index) {
    this.setState({selected: index});
    this.props.onSelect(this.props.list[index]);
  }

  render() {
    return (
      <View
        style={styles.wrapper}>
        {this.props.list.map((text, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.onSelect(index)}
            style={styles.radioWrapper}>
            <Radio
              style={styles.radio}
              selected={this.state.selected === index}
            />
            <Text>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}
export default RadioButtons;
