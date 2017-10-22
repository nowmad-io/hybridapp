import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './styles';

class Map extends Component {
  static propTypes = {
    position: PropTypes.object,
    children: PropTypes.array,
    onRef: PropTypes.func,
    onRegionChangeComplete: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { places, initialRegion, position, me, region } = this.props;
    return (
      <MapView
        ref={(ref) => this.props.onRef(ref)}
        onRegionChangeComplete={(region) => this.props.onRegionChangeComplete(region)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={region}>
        {this.props.children}
      </MapView>
    )
  }
}

Map.defaultProps = {
  onRef: () => {},
  onRegionChangeComplete: () => {},
}

export default Map;
