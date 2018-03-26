import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import Icon from '../dumbs/icon';
import Text from '../dumbs/text';

import { colors } from '../../parameters';

export default class RadioButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    selected: PropTypes.bool,
    text: PropTypes.string,
  }

  render() {
    const { selected, text } = this.props;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.wrapper}>
          <Icon
            style={styles.icon}
            name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 12,
    color: colors.green,
    lineHeight: 24,
    fontSize: 24,
  },
  text: {
    fontSize: 14,
  },
});
