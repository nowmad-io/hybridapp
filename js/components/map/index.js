import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './styles';

class Map extends Component {
  static propTypes = {
    position: PropTypes.object,
    children: PropTypes.array,
    onRef: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      initialRegion: {
        latitude: 40.7205699,
        longitude: -1.840341,
        latitudeDelta: 50,
        longitudeDelta: 50
      }
    };
  }

  render() {
    const { places, initialRegion, position, selectedPlace, me } = this.props;
    return (
      <MapView
        ref={(ref) => this.props.onRef(ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={position ? {
          ...position,
          latitudeDelta: 1,
          longitudeDelta: 1
        } : initialRegion }>
        {this.props.children}
      </MapView>
    )
  }
}

export default Map;
