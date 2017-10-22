import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'native-base';

import styles from './styles';

const BasicButton = (props) => (
  <View style={styles.buttonWrapper}>
    <Button
      style={styles.button}
      onPress={() => props.onPress()}
    >
      <Text>{props.text}</Text>
    </Button>
  </View>
)

BasicButton.defaultProps = {
  onPress: () => {}
}

BasicButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
}

export default BasicButton;
