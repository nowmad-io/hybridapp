import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { Container, View, Header, Left, Body, Right, Button, Icon, Title, Text, Item } from 'native-base';
import shortid from 'shortid';
import RNGooglePlaces from 'react-native-google-places';

import Map from '../map';
import Marker from '../marker';
import MapList from '../mapList';
import SearchWrapper from '../searchWrapper';

import { selectedPlace, regionChanged, levelChange, selectNewPlace, currentPlacesChange } from '../../actions/home'

import styles from './styles';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    places: PropTypes.array,
    currentPlaces: PropTypes.array,
    position: PropTypes.object,
    level: PropTypes.number,
    selectedPlace: PropTypes.object,
    region: PropTypes.object,
    newPlace: PropTypes.object,
    searchFocus: PropTypes.bool
  }
  componentDidMount() {
    console.log('this.refs', this.refs);
    if (this.props.newPlace) {
      this.refs.searchWrapper.getWrappedInstance().searchCoordinates(this.props.newPlace, true);
    }
  }

  componentWillReceiveProps({ selectedPlace, level }) {
    if (selectedPlace && this.props.selectedPlace
        && selectedPlace.id !== this.props.selectedPlace.id
        && this._map) {
      const selected = this.props.places.find(function(place, index) {
        if (place.id === selectedPlace.id) {
          return place;
        }
        return false;
      });
      this._map.animateToCoordinate(selected);
    }
  }

  onMarkerPress = (place) => {
    this.props.dispatch(selectedPlace(place));
  }

  onIndexChange = (index) => {
    this.props.dispatch(selectedPlace(this.props.places[index]));
  }

  onLevelChange = (level) => {
    this.props.dispatch(levelChange(level));
  }

  onRegionChangeComplete = (region) => {
    this.props.dispatch(regionChanged(region));

    const southWest = {
      latitude: region.latitude - region.latitudeDelta / 2,
      longitude: region.longitude - region.longitudeDelta / 2
    };
    const northEast = {
      latitude: region.latitude + region.latitudeDelta / 2,
      longitude: region.longitude + region.longitudeDelta / 2
    };

    const newPlaces = _.filter(this.props.places, (place) => {
      if (place.latitude > southWest.latitude && place.latitude < northEast.latitude
          && place.longitude > southWest.longitude && place.longitude < northEast.longitude) {
        return true;
      }
    })

    this.props.dispatch(currentPlacesChange(newPlaces));
  }

  onRef = (ref) => {
    this._map = ref;
  }

  onMapReady = () => {
    if (this._map && this.props.newPlace) {
      this._map.animateToCoordinate(this.props.newPlace);
    }
  }

  onMapLongPress = ({coordinate}) => {
    this.refs.searchWrapper.getWrappedInstance().searchCoordinates(coordinate);
    this.props.dispatch(selectNewPlace(coordinate));
  }

  onSearchClear = () => {
    if (this.props.newPlace) {
      this.props.dispatch(selectNewPlace(null));
    }
  }

  onNewMarkerPress = () => {
    this.refs.searchWrapper.getWrappedInstance().focusInput();
  }

  onNearbySelected = (place) => {
    const updatedPlace = {
      ...this.props.newPlace,
      ...place
    };

    this.props.dispatch(selectNewPlace(updatedPlace));
    this.props.navigation.navigate('AddReview', { place: updatedPlace });
  }

  onReviewPress = (place) => {
    this.props.dispatch(selectedPlace(place));
  }

  render() {
    const { places, currentPlaces, selectedPlace, region, navigation, newPlace, searchFocus } = this.props;

    return (
      <SearchWrapper
        ref='searchWrapper'
        onClear={() => this.onSearchClear()}>
        <Map
          onRef={this.onRef}
          onMapReady={this.onMapReady}
          onLongPress={this.onMapLongPress}
          region={region}
          onMarkerPress={this.onMarkerPress}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          { places && places.map(place => (
            <Marker
              key={shortid.generate()}
              selected={selectedPlace && selectedPlace.id === place.id}
              place={place}
              onMarkerPress={this.onMarkerPress}
            />
          ))}
          { newPlace && (
            <Marker
              key={shortid.generate()}
              place={newPlace}
              onMarkerPress={this.onNewMarkerPress}
            />
          )}
        </Map>
        <MapList
          places={currentPlaces}
          navigation={navigation}
          onIndexChange={this.onIndexChange}
          onLevelChange={this.onLevelChange}
        />
      </SearchWrapper>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  places: state.home.places,
  currentPlaces: state.home.currentPlaces,
  position: state.home.position,
  selectedPlace: state.home.selectedPlace,
  level: state.home.level,
  region: state.home.region,
  newPlace: state.home.newPlace,
  searchFocus: state.search.focused,
});

export default connect(mapStateToProps, bindActions)(Home);
