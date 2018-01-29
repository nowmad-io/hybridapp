import React from 'react';
import PropTypes from 'prop-types';
import { ProgressViewIOS } from 'react-native';

const ProgressBarIOS = props => (
  <ProgressViewIOS
    {...props}
    progress={props.progress ? props.progress / 100 : 0.5}
    progressTintColor={props.color ? props.color : '#FFF'}
    trackTintColor="rgba(255,255,255,0.5)"
  />
);

ProgressBarIOS.propTypes = {
  progress: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressBarIOS;
