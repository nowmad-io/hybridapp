import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'native-base';

import Text from '../dumbs/text';

import styles from './styles';

const BasicButton = (props) => (
  <View style={styles.buttonWrapper}>
    { props.children }
    <Button
      style={[styles.button,
        !props.children ? { width: '100%' } : {}
      ]}
      onPress={props.onPress}
    >
      <Text
        style={!props.children ? styles.text : {}}
      >
        {props.text}
      </Text>
    </Button>
  </View>
)

BasicButton.defaultProps = {
  onPress: () => {}
}

BasicButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
}

export default BasicButton;
