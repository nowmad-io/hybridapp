import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import { colors } from '../../parameters';

export default class MarkerPosition extends PureComponent {
  static propTypes = {
    onMarkerPress: PropTypes.func,
    location: PropTypes.object,
  };

  static defaultProps = {
    onMarkerPress: () => true,
  }

  render() {
    const { onMarkerPress, location } = this.props;

    return (
      <MapView.Marker
        coordinate={location}
        onPress={() => onMarkerPress(location)}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.dot} />
      </MapView.Marker>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    height: 14,
    width: 14,
    backgroundColor: colors.blue,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 50,
  },
});
