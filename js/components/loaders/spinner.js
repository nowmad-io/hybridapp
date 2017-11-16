import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Spinner as BaseSpinner } from 'native-base';

import styles, { colors } from './styles';

const Spinner = (props) => (
  <View style={[props.visible && props.style, props.overlay ? styles.overlay : {}]}>
    { props.visible && (
      <BaseSpinner color={props.color} />
    )}
  </View>
)

Spinner.defaultProps = {
  color: colors.green,
  visible: false,
  style: {},
  overlay: false
}

Spinner.propTypes = {
  color: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.object,
  overlay: PropTypes.bool,
}

export default Spinner;
