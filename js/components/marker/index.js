import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import MapView from 'react-native-maps';

import { selectedPlace } from '../../actions/home'

import styles from './styles';

class Marker extends Component {
  static propTypes = {
    place: PropTypes.object,
    selectedPlace: PropTypes.number,
    level: PropTypes.number
  }

  onPress() {
    this.props.dispatch(selectedPlace(this.props.place.id));
  }

  render() {
    const { place, selectedPlace } = this.props;
    return (
      <MapView.Marker
        coordinate={{latitude: place.latitude, longitude: place.longitude}}
        onPress={() => this.onPress()}
      >
        <Text>{selectedPlace === place.id ? 'YO' : 'yo'}</Text>
      </MapView.Marker>
    )
  }
};

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  selectedPlace: state.home.selectedPlace,
  level: state.home.level
});

export default connect(mapStateToProps, bindActions)(Marker);
