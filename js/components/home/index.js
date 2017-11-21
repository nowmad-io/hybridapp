import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { Container, View, Header, Left, Body, Right, Button, Icon, Title, Text, Item } from 'native-base';
import shortid from 'shortid';
import _ from 'lodash';

import Map from '../map';
import Marker from '../marker';
import MapList from '../mapList';
import SearchWrapper from '../searchWrapper';

import { selectedPlace, regionChanged, levelChange, selectNewPlace,
  currentPlacesChange, searchedPlaces, googlePlace } from '../../actions/home'

import styles, { sizes } from './styles';

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
    if (this.props.newPlace) {
      this.refs.searchWrapper.getWrappedInstance().searchCoordinates(this.props.newPlace, true);
    }
    if (this.props.googlePlace) {
      this.refs.searchWrapper.getWrappedInstance().setValue(this.props.googlePlace.name);
    }
  }

  componentWillReceiveProps({ selectedPlace, level }) {
    if (selectedPlace && this.props.selectedPlace
        && selectedPlace.id !== this.props.selectedPlace.id
        && this._map) {
      this._map.animateToCoordinate(selectedPlace);
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
    if (this.props.googlePlace) {
      this.props.dispatch(googlePlace(null));
    }
    this.props.dispatch(searchedPlaces(null));
  }

  onNewMarkerPress = () => {
    this.refs.searchWrapper.getWrappedInstance().focusInput();
  }

  onNearbySelected = (place) => {
    this.props.dispatch(selectNewPlace(place));
    this.props.navigation.navigate('AddReview', { place });
  }

  onNearbyPlaceSelected = (place) => {
    this.props.dispatch(googlePlace(place));
    this.refs.searchWrapper.getWrappedInstance().blurInput();
    this.refs.searchWrapper.getWrappedInstance().setValue(place.name);
  }

  onPlaceSelected = (place) => {
    this.props.dispatch(searchedPlaces([place]));
    this.refs.searchWrapper.getWrappedInstance().blurInput();
    this._map.animateToCoordinate(place);
  }

  onPlacesSelected = (place, places) => {
    this.props.dispatch(searchedPlaces(_.compact([place, ...places])));
    this.refs.searchWrapper.getWrappedInstance().blurInput();
    if (place) {
      this._map.animateToCoordinate(place);
    }
  }

  onReviewPress = (place) => {
    this.props.dispatch(selectedPlace(place));
  }

  onFriendPress = (user) => {
    this.refs.searchWrapper.getWrappedInstance().blurInput();
    this.refs.searchWrapper.getWrappedInstance().setValue(user.first_name);
  }

  render() {
    const { places, currentPlaces, selectedPlace, region, navigation, newPlace,
      searchFocus, googlePlace, searchedPlaces } = this.props;

    return (
      <SearchWrapper
        ref='searchWrapper'
        onClear={() => this.onSearchClear()}
        onNearbySelected={this.onNearbySelected}
        onNearbyPlaceSelected={this.onNearbyPlaceSelected}
        onPlaceSelected={this.onPlaceSelected}
        onPlacesSelected={this.onPlacesSelected}
        onFriendPress={this.onFriendPress}
        onMenuPress={() => navigation.navigate('DrawerOpen')}>
        <Map
          onRef={this.onRef}
          onMapReady={this.onMapReady}
          onLongPress={this.onMapLongPress}
          region={region}
          onMarkerPress={this.onMarkerPress}
          onRegionChangeComplete={this.onRegionChangeComplete}
          padding={{
            top: sizes.toolbarHeight,
            bottom: sizes.ITEM_LEVEL1
          }}
        >
          { (searchedPlaces.length ? searchedPlaces : places).map(place => (
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
          { googlePlace && (
            <Marker
              key={shortid.generate()}
              place={googlePlace}
              onMarkerPress={this.onMarkerPress}
            />
          )}
        </Map>
        <MapList
          places={searchedPlaces.length ? searchedPlaces : currentPlaces}
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
  searchedPlaces: state.home.searchedPlaces,
  position: state.home.position,
  selectedPlace: state.home.selectedPlace,
  level: state.home.level,
  region: state.home.region,
  newPlace: state.home.newPlace,
  googlePlace: state.home.googlePlace,
  searchFocus: state.search.focused,
});

export default connect(mapStateToProps, bindActions)(Home);
