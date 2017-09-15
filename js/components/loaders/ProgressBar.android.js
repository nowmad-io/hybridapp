import React from 'react';
import { ProgressBarAndroid } from 'react-native';

const SpinnerNB = props => (
  <ProgressBarAndroid
    {...props}
    styleAttr="Horizontal"
    indeterminate={false}
    progress={props.progress ? props.progress / 100 : 0.5}
    color={props.color ? props.color : '#FFF'}
  />
);

SpinnerNB.propTypes = {
  progress: React.PropTypes.number,
  color: React.PropTypes.string,
};

export default SpinnerNB;
