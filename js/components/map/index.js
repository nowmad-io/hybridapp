import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import shortid from 'shortid';

import Marker from '../marker';

import styles from './styles';

class Map extends Component {
  static propTypes = {
    places: PropTypes.array,
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
    const { places, initialRegion, position } = this.props;
    console.log('places', places)
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(ref) => { this.mapRef = ref }}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={position ? {
          ...position,
          latitudeDelta: 1,
          longitudeDelta: 1
        } : initialRegion }>
        { places && places.map(place => (
          <Marker
            key={shortid.generate()}
            place={place}
          />
        )) }
      </MapView>
    )
  }
}

export default Map;
