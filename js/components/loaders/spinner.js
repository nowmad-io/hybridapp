import React from 'react';
import PropTypes from 'prop-types';

import { Spinner as BaseSpinner } from 'native-base';

import styles, { colors } from './styles';

const Spinner = (props) => ({
  props.visible && (
    <BaseSpinner color={props.color} />
  )
})

Spinner.defaultProps = {
  color: colors.green,
  visible: false
}

Spinner.propTypes = {
  color: PropTypes.string
  visible: PropTypes.bool
}

export default Spinner;
