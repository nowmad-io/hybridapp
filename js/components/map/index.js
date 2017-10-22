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
    zoomEnabled: PropTypes.bool,
    rotateEnabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { region, zoomEnabled, rotateEnabled, scrollEnabled } = this.props;
    return (
      <MapView
        ref={(ref) => this.props.onRef(ref)}
        onMapReady={() => this.props.onMapReady()}
        onRegionChangeComplete={(region) => this.props.onRegionChangeComplete(region)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={region}
        zoomEnabled={zoomEnabled}
        rotateEnabled={rotateEnabled}
        scrollEnabled={scrollEnabled}
      >
        {this.props.children}
      </MapView>
    )
  }
}

Map.defaultProps = {
  onRef: () => {},
  onRegionChangeComplete: () => {},
  onMapReady: () => {},
  zoomEnabled: true,
  rotateEnabled: true,
  scrollEnabled: true,
}

export default Map;
