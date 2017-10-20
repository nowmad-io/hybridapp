import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native'
import { Text } from 'native-base';

import styles from './styles';

const Tag = props => (
  <View style={styles.tags}>
    {props.text ? (
      <Text style={styles.text}>
        {props.text}
      </Text>
    ) : null}
    {props.children}
  </View>
);

Tag.propTypes = {
  text: PropTypes.string,
  children: PropTypes.object,
};

export default Tag;
