import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBarAndroid as ProgressBar } from 'react-native';

const ProgressBarAndroid = props => (
  <ProgressBar
    {...props}
    styleAttr="Horizontal"
    indeterminate={false}
    progress={props.progress ? props.progress / 100 : 0.5}
    color={props.color ? props.color : '#FFF'}
  />
);

ProgressBarAndroid.propTypes = {
  progress: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressBarAndroid;
