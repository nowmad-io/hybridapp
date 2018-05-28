import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class Map extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    onRef: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
    onPoiClick: PropTypes.func,
    onLongPress: PropTypes.func,
    onLayout: PropTypes.func,
    onMapReady: PropTypes.func,
    onPanDrag: PropTypes.func,
    region: PropTypes.object,
    zoomEnabled: PropTypes.bool,
    rotateEnabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    moveOnMarkerPress: PropTypes.bool,
    cacheEnabled: PropTypes.bool,
    mapPadding: PropTypes.object,
  }

  static defaultProps = {
    onRef: () => true,
    onRegionChangeComplete: () => true,
    onPoiClick: () => true,
    onLongPress: () => true,
    onLayout: () => true,
    onMapReady: () => true,
    onPanDrag: () => true,
    zoomEnabled: true,
    rotateEnabled: true,
    scrollEnabled: true,
  }

  onRef(ref) {
    this._ref = ref;
    this.props.onRef(ref);
  }

  onMapReady() {
    if (this._ref) {
      this._ref.map.setNativeProps({ style: [styles.map, { marginBottom: 0 }] });
    }

    this.props.onMapReady();
  }

  updatePadding(mapPadding) {
    this._ref.map.setNativeProps({ style: { ...styles.map, marginBottom: 1 } });
    this._ref.map.setNativeProps({ mapPadding });
    setTimeout(() => {
      this._ref.map.setNativeProps({ style: { ...styles.map, marginBottom: 0 } });
    }, 100);
  }

  animateToCoordinate(place) {
    this._ref.animateToCoordinate(place);
  }

  fitToCoordinates(coordinates) {
    this._ref.fitToCoordinates(coordinates);
  }

  zoomBy(zoom) {
    this._ref.zoomBy(zoom);
  }

  render() {
    const {
      region, zoomEnabled, rotateEnabled, scrollEnabled, mapPadding, onLongPress,
      onRegionChangeComplete, moveOnMarkerPress, onPoiClick, onLayout, onPanDrag,
      cacheEnabled,
    } = this.props;

    return (
      <MapView
        ref={ref => this.onRef(ref)}
        onMapReady={() => this.onMapReady()}
        onRegionChangeComplete={newRegion => onRegionChangeComplete(newRegion)}
        onLongPress={event => onLongPress(event.nativeEvent)}
        provider={PROVIDER_GOOGLE}
        style={[
          styles.map,
          { marginBottom: 1 },
        ]}
        showsMyLocationButton={false}
        initialRegion={region}
        zoomEnabled={zoomEnabled}
        rotateEnabled={rotateEnabled}
        scrollEnabled={scrollEnabled}
        mapPadding={mapPadding}
        moveOnMarkerPress={moveOnMarkerPress}
        onLayout={onLayout}
        onPanDrag={onPanDrag}
        onPoiClick={event => onPoiClick && onPoiClick(event.nativeEvent)}
        cacheEnabled={cacheEnabled}
      >
        {this.props.children}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
