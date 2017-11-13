import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Spinner as BaseSpinner } from 'native-base';

import styles, { colors } from './styles';

const Spinner = (props) => (
  <View style={[props.style]}>
    { props.visible && (
      <BaseSpinner color={props.color} />
    )}
  </View>
)

Spinner.defaultProps = {
  color: colors.green,
  visible: false,
  style: {}
}

Spinner.propTypes = {
  color: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.object,
}

export default Spinner;
