import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

const setMapping = {
  MaterialIcon,
  SimpleLineIcons,
};

export default class Icon extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    set: PropTypes.oneOf([
      'MaterialIcon',
      'SimpleLineIcons',
    ]),
    rotate: PropTypes.number,
  };

  static defaultProps = {
    set: 'MaterialIcon',
  }

  render() {
    const { style, set, rotate } = this.props;
    const FontSet = setMapping[set];

    return (
      <FontSet
        {...this.props}
        style={[
          styles.icon,
          rotate && { transform: [{ rotate: `${rotate}deg` }] },
          style,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    color: colors.black,
  },
});
