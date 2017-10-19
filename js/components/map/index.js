import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import shortid from 'shortid';

import { selectedPlace } from '../../actions/home'

import Marker from '../marker';

import styles from './styles';

class Map extends Component {
  static propTypes = {
    places: PropTypes.array,
    position: PropTypes.object,
    selectedPlace: PropTypes.number,
    level: PropTypes.number
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

  onPress(place) {
    this.props.dispatch(selectedPlace(place.id));
  }

  render() {
    const { places, initialRegion, position, selectedPlace } = this.props;
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
          <MapView.Marker
            key={shortid.generate()}
            coordinate={{latitude: place.latitude, longitude: place.longitude}}
            onPress={() => this.onPress(place)}
          >
            <Marker
              selected={selectedPlace === place.id}
              place={place}
            />
          </MapView.Marker>
        )) }
      </MapView>
    )
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  selectedPlace: state.home.selectedPlace,
  level: state.home.level
});

export default connect(mapStateToProps, bindActions)(Map);
