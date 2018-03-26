import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import _ from 'lodash';

import CarouselXY from '../../dumbs/carouselXY';
import Marker from '../../dumbs/marker';
import MarkerPosition from '../../dumbs/markerPosition';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import Icon from '../../dumbs/icon';
import Filters from '../../dumbs/filters';
import Badge from '../../dumbs/badge';
import Map from '../../map';
import SearchWrapper from '../../searchWrapper';

import {
  _selectedPlace, regionChanged, levelChange, selectNewPlace,
  currentPlacesChange, _searchedPlaces, googlePlace, setFromReview, getGeolocation,
} from '../../../actions/home';
import { placeDetails, gPlaceToPlace } from '../../../api/search';

import { sizes, carousel } from '../../../parameters';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    places: PropTypes.array,
    searchedPlaces: PropTypes.array,
    currentPlaces: PropTypes.array,
    geolocation: PropTypes.object,
    level: PropTypes.number,
    selectedPlace: PropTypes.object,
    region: PropTypes.object,
    newPlace: PropTypes.object,
    fromReview: PropTypes.bool,
    googlePlace: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      addThisPlace: false,
      searchVisible: false,
      panY: new Animated.Value(-carousel.level1),
      filtersVisible: false,
      filters: {
        categories: [],
      },
    };
  }

  componentDidMount() {
    if (this.props.newPlace) {
      this._searchWrapper.getWrappedInstance().searchCoordinates(this.props.newPlace, true);
    }
    if (this.props.googlePlace) {
      this._searchWrapper.getWrappedInstance().setValue(this.props.googlePlace.name);
    }
    if (this.props.level) {
      this._carouselXY.goToLevel(this.props.level);
    }

    this.onRegionChangeComplete(this.props.region);
  }

  componentWillReceiveProps({
    selectedPlace, level, fromReview, geolocation,
  }) {
    if (fromReview) {
      this._searchWrapper.getWrappedInstance().clear();
      this._searchWrapper.getWrappedInstance().blurInput();
      this.onRegionChangeComplete(this.props.region);
      this.props.dispatch(setFromReview(false));
    }

    if (selectedPlace
        && this.props.selectedPlace
        && selectedPlace.id !== this.props.selectedPlace.id) {
      if (this.props.level === 2) {
        this._map.animateToCoordinate(selectedPlace);
      }
    }

    if (geolocation && geolocation.location
        && !geolocation.loading && this.props.geolocation.loading) {
      this._map.fitToCoordinates([geolocation.location], {
        edgePadding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      });
      this.setState({ addThisPlace: true });
    }

    if (level && level !== this.props.level) {
      this._map.updatePadding({
        top: sizes.toolbarHeight,
        bottom: level === 1 ? carousel.level1 : carousel.level2,
      });

      if (level < 3 && this.props.selectedPlace) {
        this._map.animateToCoordinate(this.props.selectedPlace);
      }
    }
  }

  onMarkerPress = (place) => {
    const { searchedPlaces, currentPlaces } = this.props;
    const index = _.findIndex(
      searchedPlaces.length ? searchedPlaces : currentPlaces,
      p => (p.id === place.id),
    );

    this.props.dispatch(_selectedPlace(place));
    this._carouselXY.goToIndex(index);

    if (this.props.level === 2) {
      this._map.animateToCoordinate(place);
    }
  }

  onIndexChange = (index) => {
    const { dispatch, searchedPlaces, currentPlaces } = this.props;
    dispatch(_selectedPlace(searchedPlaces.length ? searchedPlaces[index] : currentPlaces[index]));
  }

  onLevelChange = (level) => {
    this.props.dispatch(levelChange(level));
  }

  onRegionChangeComplete = (region) => {
    const { level } = this.props;
    const helper = Math.log2(360 * ((sizes.width / 256) / region.longitudeDelta));
    /* eslint-disable-next-line no-restricted-properties */
    const scale = Math.pow(2, helper + 1) + 1;

    const southWest = {
      latitude: (region.latitude - region.latitudeDelta / 2) -
        ((level === 1 ? -carousel.level1 : -carousel.level1 - carousel.level2) / scale),
      longitude: region.longitude - region.longitudeDelta / 2,
    };

    const northEast = {
      latitude: (region.latitude + region.latitudeDelta / 2) - (sizes.toolbarHeight / scale),
      longitude: region.longitude + region.longitudeDelta / 2,
    };

    const newPlaces = _.filter(this.props.places, (place) => {
      if (place.latitude > southWest.latitude && place.latitude < northEast.latitude
          && place.longitude > southWest.longitude && place.longitude < northEast.longitude) {
        return true;
      }
      return false;
    });

    this.props.dispatch(regionChanged(region));

    if (!_.isEqual(this.props.currentPlaces, newPlaces)) {
      this.props.dispatch(currentPlacesChange(newPlaces));
    }
  }

  onMapReady = () => {
    if (this._map && this.props.newPlace) {
      this._map.animateToCoordinate(this.props.newPlace);
    }
  }

  onMapLongPress = ({ coordinate }) => {
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
    this.props.dispatch(_searchedPlaces(null));
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
    this.props.dispatch(_searchedPlaces([place]));
    this._searchWrapper.getWrappedInstance().blurInput();
    this._map.animateToCoordinate(place);
  }

  onPlacesSelected = (place, places) => {
    this.props.dispatch(_searchedPlaces(_.compact([place, ...places])));
    this._searchWrapper.getWrappedInstance().blurInput();
    if (place) {
      this._map.animateToCoordinate(place);
    }
  }

  onReviewPress = (place, review) => {
    this._searchWrapper.getWrappedInstance().blurInput();
    this._searchWrapper.getWrappedInstance().setValue(review.short_description);
    this.props.dispatch(_selectedPlace(place));
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
    const toLevel = (this.props.level <= 2) ? this.props.level === 1 ? 2 : 1 : null;
    if (toLevel) {
      this.onLevelChange(toLevel);
      this._carouselXY.goToLevel(toLevel);
    }
  }

  onPoiClick = (poi) => {
    placeDetails(poi.placeId)
      .then(response => response.json())
      .then(({ result }) => {
        this.onNearbyPlaceSelected(gPlaceToPlace(result));
      });
  }

  onPanDrag = () => {
    if (this.state.addThisPlace) {
      this.setState({ addThisPlace: false });
    }
  }

  onFiltersPress = () => {
    if (this.state.filtersVisible) {
      this._carouselXY.goToLevel(this.props.level);
    } else {
      this._carouselXY.goToLevel(1);
    }
    this.setState({ filtersVisible: !this.state.filtersVisible });
  }

  onFiltersChange = ({ categories }) => {
    this.setState({
      filters: {
        ...this.state.filters,
        categories,
      },
    });
  }

  filter(places) {
    if (!this.state.filters.categories.length) {
      return places;
    }

    return _.filter(places, (place) => {
      if (!place.reviews) {
        return true;
      }

      const placeCategories = _.uniqWith(
        _.flatten(place.reviews.map(review => review.categories)),
        _.isEqual,
      );

      return _.intersectionWith(
        placeCategories,
        this.state.filters.categories,
        (cat, name) => (cat.name === name),
      ).length;
    });
  }

  zoomOut = () => {
    this._map.zoomBy(-4);
  }

  render() {
    const {
      dispatch, places, currentPlaces, selectedPlace, region,
      navigation, newPlace, searchedPlaces, geolocation,
    } = this.props;
    const {
      addThisPlace, searchVisible, panY, filtersVisible,
    } = this.state;

    return (
      <SearchWrapper
        ref={(sw) => { this._searchWrapper = sw; }}
        onFocus={() => this.setState({ searchVisible: true })}
        onBlur={() => this.setState({ searchVisible: false })}
        onClear={() => this.onSearchClear()}
        onNearbySelected={this.onNearbySelected}
        onNearbyPlaceSelected={this.onNearbyPlaceSelected}
        onPlaceSelected={this.onPlaceSelected}
        onPlacesSelected={this.onPlacesSelected}
        onFriendPress={this.onFriendPress}
        onMenuPress={() => navigation.navigate('DrawerOpen')}
        onReviewPress={this.onReviewPress}
      >
        {(addThisPlace && !searchVisible) && (
          <Button
            style={styles.addPlaceButton}
            onPress={() => this.onMapLongPress({ coordinate: geolocation.location })}
            fab
          >
            <Text>Add this place</Text>
          </Button>
        )}
        <Map
          ref={(m) => { this._map = m; }}
          moveOnMarkerPress={false}
          onMapReady={this.onMapReady}
          onLongPress={this.onMapLongPress}
          region={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          mapPadding={{
            top: sizes.toolbarHeight,
            bottom: carousel.level1,
          }}
          onPoiClick={this.onPoiClick}
          onPanDrag={this.onPanDrag}
        >
          {this.filter(searchedPlaces.length ? searchedPlaces : places).map(place => (
            <Marker
              key={shortid.generate()}
              selected={selectedPlace && selectedPlace.id === place.id}
              place={place}
              onMarkerPress={this.onMarkerPress}
            />
          ))}
          {newPlace && (
            <Marker
              key={shortid.generate()}
              place={newPlace}
              onMarkerPress={this.onNewMarkerPress}
            />
          )}
          {geolocation && geolocation.location && (
            <MarkerPosition
              location={geolocation.location}
              onMarkerPress={location => this.onMapLongPress({ coordinate: location })}
            />
          )}
        </Map>
        <CarouselXY
          ref={(c) => { this._carouselXY = c; }}
          data={this.filter(searchedPlaces.length ? searchedPlaces : currentPlaces)}
          onIndexChange={this.onIndexChange}
          onLevelChange={this.onLevelChange}
          onHeaderPress={this.onHeaderPress}
          navigation={this.props.navigation}
          selectedPlace={selectedPlace}
          panY={panY}
        />

        <Animated.View
          style={[
            styles.buttonControls,
            { transform: [{ translateY: panY }] },
          ]}
          pointerEvents="box-none"
        >
          <Button
            fab
            icon="zoom-out-map"
            style={styles.zoomOut}
            onPress={this.zoomOut}
          />
          <Button fab icon="my-location" onPress={() => dispatch(getGeolocation())} />
        </Animated.View>
        <Filters
          style={styles.filters}
          visible={filtersVisible}
          onFiltersChange={this.onFiltersChange}
        >
          <Animated.View
            style={[
              styles.filterButtonWrapper,
              { transform: [{ translateY: panY }] },
            ]}
            pointerEvents="box-none"
          >
            <Button
              fab
              style={styles.filterButton}
              onPress={this.onFiltersPress}
            >
              <Text>Filters</Text>
              {this.state.filters.categories.length ? (
                <Badge text={this.state.filters.categories.length} />
              ) : (
                <Icon name="equalizer" set="SimpleLineIcons" />
              )}
            </Button>
          </Animated.View>
        </Filters>
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
  geolocation: state.home.geolocation,
  selectedPlace: state.home.selectedPlace,
  level: state.home.level,
  region: state.home.region,
  newPlace: state.home.newPlace,
  googlePlace: state.home.googlePlace,
  fromReview: state.home.fromReview,
});

export default connect(mapStateToProps, bindActions)(Home);


const styles = StyleSheet.create({
  addPlaceButton: {
    marginTop: 28,
    borderRadius: 2,
    height: 40,
    alignSelf: 'center',
    zIndex: 1,
  },
  filters: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: 20,
  },
  zoomOut: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  buttonControls: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
    padding: 14,
  },
  filterButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    height: 56,
    alignItems: 'center',
    width: '100%',
    flex: 1,
    marginBottom: 8,
    zIndex: 3,
  },
  filterButton: {
    height: 40,
  },
});
