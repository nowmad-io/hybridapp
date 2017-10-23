import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';

import styles from './styles';

const Label = (props) => (
  <View style={styles.LabelWrapper}>
      <Text style={styles.label}>{props.text}</Text>
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
}

export default Label;
