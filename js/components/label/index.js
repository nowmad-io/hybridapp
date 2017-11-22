import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';

import styles from './styles';

const Label = (props) => (
  <View style={[styles.labelWrapper(props.subtitle)]}>
      <Text style={styles.label(props.subtitle)}>{props.text}</Text>
      { props.required && (
        <View style={styles.requiredWrapper}>
          <View style={styles.required} />
        </View>
      )}
  </View>
)

Label.defaultProps = {
  required: false
}

Label.propTypes = {
  text: PropTypes.string,
  required: PropTypes.bool,
  subtitle: PropTypes.bool
}

export default Label;
