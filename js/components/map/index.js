import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

import Marker from '../marker';

import styles from './styles';

class Map extends Component {
  static propTypes = {
    markers: PropTypes.array,
    position: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      initialRegion: {
        latitude: 40.7205699,
        longitude: -1.840341,
        latitudeDelta: 50,
        longitudeDelta: 50
      }
    }
  }

  render() {
    const { markers, initialRegion, position } = this.props;
    return (
      <MapView
        ref={(ref) => { this.mapRef = ref }}
        style={styles.map}
        initialRegion={ {
          ...position,
          latitudeDelta: 1,
          longitudeDelta: 1
        } || initialRegion }>
        { markers && markers.map(marker => (
          <Marker
            key={marker.id}
            marker={marker}
          />
        )) }
      </MapView>
    )
  }
}

export default Map;
