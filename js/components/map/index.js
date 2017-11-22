import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './styles';

class Map extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    onRef: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
    region: PropTypes.object,
    onLongPress: PropTypes.func,
    zoomEnabled: PropTypes.bool,
    rotateEnabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    moveOnMarkerPress: PropTypes.bool,
    mapPadding: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  onRef(ref) {
    this._ref = ref;
    this.props.onRef(ref);
  }

  onMapReady() {
    if (this._ref) {
      this._ref.map.setNativeProps({ style: {...styles.map, marginBottom: 0} });
    }

    this.props.onMapReady();
  }

  updatePadding(mapPadding) {
    this._ref.map.setNativeProps({ style: {...styles.map, marginBottom: 1} });
    this._ref.map.setNativeProps({ mapPadding });
    setTimeout(() => {
      this._ref.map.setNativeProps({ style: {...styles.map, marginBottom: 0} });
    }, 100);
  }

  animateToCoordinate(place) {
    this._ref.animateToCoordinate(place);
  }

  render() {
    const { region, zoomEnabled, rotateEnabled, scrollEnabled, mapPadding,
      moveOnMarkerPress } = this.props;
    return (
      <MapView
        ref={(ref) => this.onRef(ref)}
        onMapReady={() => this.onMapReady()}
        onRegionChangeComplete={(region) => this.props.onRegionChangeComplete(region)}
        onLongPress={(event) => this.props.onLongPress(event.nativeEvent)}
        provider={PROVIDER_GOOGLE}
        style={{...styles.map, marginBottom: 1}}
        showsUserLocation={true}
        initialRegion={region}
        zoomEnabled={zoomEnabled}
        rotateEnabled={rotateEnabled}
        scrollEnabled={scrollEnabled}
        mapPadding={mapPadding}
        moveOnMarkerPress={moveOnMarkerPress}
      >
        {this.props.children}
      </MapView>
    )
  }
}

Map.defaultProps = {
  onRef: () => true,
  onRegionChangeComplete: () => true,
  onMapReady: () => true,
  onLongPress: () => true,
  zoomEnabled: true,
  rotateEnabled: true,
  scrollEnabled: true,
}

export default Map;
