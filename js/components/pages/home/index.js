import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';
import shortid from 'shortid';
import _ from 'lodash';

import CarouselXY from '../../dumbs/carouselXY';
import Map from '../../map';
import Marker from '../../marker';
import SearchWrapper from '../../searchWrapper';

import { selectedPlace, regionChanged, levelChange, selectNewPlace,
  currentPlacesChange, searchedPlaces, googlePlace, setFromReview } from '../../../actions/home'
import { placeDetails, gPlaceToPlace } from '../../../api/search';

import { sizes, carousel } from '../../../parameters';

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
      this._searchWrapper.getWrappedInstance().searchCoordinates(this.props.newPlace, true);
    }
    if (this.props.googlePlace) {
      this._searchWrapper.getWrappedInstance().setValue(this.props.googlePlace.name);
    }

    this.onRegionChangeComplete(this.props.region);
  }

  componentWillUpdate({ selectedPlace, level, fromReview, position }) {
    if (fromReview) {
      this._searchWrapper.getWrappedInstance().clear();
      this._searchWrapper.getWrappedInstance().blurInput();
      this.onRegionChangeComplete(this.props.region);
      this.props.dispatch(setFromReview(false));
    }

    if (selectedPlace
        && this.props.selectedPlace
        && selectedPlace.id !== this.props.selectedPlace.id) {

      if (this.props.level === 2) {
        this._map.animateToCoordinate(selectedPlace);
      }
    }

    if (position
      && this.props.position
      && position.latitude !== this.props.position.latitude
      && position.longitude !== this.props.position.longitude) {
        this._map.fitToCoordinates([position]);
    }

    if (level && level !== this.props.level) {
      this._map.updatePadding({
        top: sizes.toolbarHeight,
        bottom: level === 1 ? - carousel.level1 : - carousel.level1 - carousel.level2
      });

      if (level < 3 && this.props.selectedPlace) {
        this._map.animateToCoordinate(this.props.selectedPlace);
      }
    }
  }

  onMarkerPress = (e, place) => {
    const { searchedPlaces, currentPlaces } = this.props,
          index = _.findIndex(searchedPlaces.length ? searchedPlaces : currentPlaces, (p) => (p.id == place.id));

    this.props.dispatch(selectedPlace(place));
    this._carouselXY.goToIndex(index);

    if (this.props.level === 2) {
      this._map.animateToCoordinate(place);
    }
  }

  onIndexChange = (index) => {
    this.props.dispatch(selectedPlace(this.props.searchedPlaces.length ? this.props.searchedPlaces[index] : this.props.currentPlaces[index]));
  }

  onLevelChange = (level) => {
    this.props.dispatch(levelChange(level));
  }

  onRegionChangeComplete = (region) => {
    const scale = Math.pow(2, Math.log2(360 * ((sizes.width/256) / region.longitudeDelta)) + 1) + 1,
          { level } = this.props;

    this.props.dispatch(regionChanged(region));

    const southWest = {
      latitude: (region.latitude - region.latitudeDelta / 2)  - ((level === 1 ? - carousel.level1 : - carousel.level1 - carousel.level2) / scale),
      longitude: region.longitude - region.longitudeDelta / 2
    };

    const northEast = {
      latitude: (region.latitude + region.latitudeDelta / 2) - (sizes.toolbarHeight / scale),
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

  onMapReady = () => {
    if (this._map && this.props.newPlace) {
      this._map.animateToCoordinate(this.props.newPlace);
    }
  }

  onMapLongPress = ({coordinate}) => {
    this._searchWrapper.getWrappedInstance().searchCoordinates(coordinate);
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
    this._searchWrapper.getWrappedInstance().focusInput();
  }

  onNearbySelected = (place) => {
    this.props.dispatch(selectNewPlace(place));
    this.props.navigation.navigate('AddReview', { place });
  }

  onNearbyPlaceSelected = (place) => {
    this.props.dispatch(googlePlace(place));
    this._searchWrapper.getWrappedInstance().blurInput();
    this._searchWrapper.getWrappedInstance().setValue(place.name);
  }

  onPlaceSelected = (place) => {
    this.props.dispatch(searchedPlaces([place]));
    this._searchWrapper.getWrappedInstance().blurInput();
    this._map.animateToCoordinate(place);
  }

  onPlacesSelected = (place, places) => {
    this.props.dispatch(searchedPlaces(_.compact([place, ...places])));
    this._searchWrapper.getWrappedInstance().blurInput();
    if (place) {
      this._map.animateToCoordinate(place);
    }
  }

  onReviewPress = (place, review) => {
    this._searchWrapper.getWrappedInstance().blurInput();
    this._searchWrapper.getWrappedInstance().setValue(review.short_description);
    this.props.dispatch(selectedPlace(place));
    this._map.animateToCoordinate(place);
  }

  onFriendPress = (user) => {
    if (user.type === 'other') {
      this.props.navigation.navigate('AddFriend', { user });
    } else {
      this._searchWrapper.getWrappedInstance().blurInput();
      this._searchWrapper.getWrappedInstance().setValue(user.first_name);
    }
  }

  onHeaderPress = () => {
    const toLevel = this.props.level <= 2 ? this.props.level === 1 ? 2 : 1 : null;
    if (toLevel) {
      this.onLevelChange(toLevel);
      this._carouselXY.goToLevel(toLevel);
    }
  }

  onPoiClick = (poi) => {
    placeDetails(poi.placeId)
      .then((response) => response.json())
      .then(({result}) => {
        this.onNearbyPlaceSelected(gPlaceToPlace(result));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onLayout = () => {

  }

  render() {
    const { places, currentPlaces, selectedPlace, region, navigation, newPlace,
      searchFocus, searchedPlaces } = this.props;

    return (
      <SearchWrapper
        ref='searchWrapper'
        ref={(sw) => { this._searchWrapper = sw; }}
        onClear={() => this.onSearchClear()}
        onNearbySelected={this.onNearbySelected}
        onNearbyPlaceSelected={this.onNearbyPlaceSelected}
        onPlaceSelected={this.onPlaceSelected}
        onPlacesSelected={this.onPlacesSelected}
        onFriendPress={this.onFriendPress}
        onMenuPress={() => navigation.navigate('DrawerOpen')}
        onReviewPress={this.onReviewPress}
      >
        <Map
          ref={(m) => { this._map = m; }}
          moveOnMarkerPress={false}
          onMapReady={this.onMapReady}
          onLongPress={this.onMapLongPress}
          region={region}
          onMarkerPress={this.onMarkerPress}
          onRegionChangeComplete={this.onRegionChangeComplete}
          mapPadding={{
            top: sizes.toolbarHeight,
            bottom: - carousel.level1
          }}
          onLayout={this.onLayout}
          onPoiClick={this.onPoiClick}
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
        </Map>
        <CarouselXY
          ref={(c) => { this._carouselXY = c; }}
          data={searchedPlaces.length ? searchedPlaces : currentPlaces}
          onIndexChange={this.onIndexChange}
          onLevelChange={this.onLevelChange}
          onHeaderPress={this.onHeaderPress}
          navigation={this.props.navigation}
          onHeaderPress={this.onHeaderPress}
          selectedPlace={selectedPlace}
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
  fromReview: state.home.fromReview,
  searchFocus: state.search.focused,
});

export default connect(mapStateToProps, bindActions)(Home);
