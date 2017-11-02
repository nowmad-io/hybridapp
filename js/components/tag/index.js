import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'native-base';

import styles from './styles';

const Tag = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.tags(props.selected)}>
        {props.text ? (
          <Text style={styles.text(props.selected)}>
            {props.text}
          </Text>
        ) : null}
        {props.children}
    </View>
  </TouchableOpacity>
);

Tag.defaultProps = {
  onPress: () => {}
};

Tag.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.object,
  selected: PropTypes.bool,
};

export default Tag;
