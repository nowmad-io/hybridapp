import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import Carousel from './carousel';
import Marker from '../../dumbs/marker';
import MarkerPosition from '../../dumbs/markerPosition';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import Icon from '../../dumbs/icon';
import Filters from '../../dumbs/filters';
import Badge from '../../dumbs/badge';
import Map from '../../dumbs/map';
import Search from './search';

import { getGeolocation, regionChanged, filtersChange, placeSelect, gPlace } from '../../../actions/home';
import { selectPlaces } from '../../../reducers/home';
import { sendFriendship } from '../../../api/friends';
import { poiToPlace, placeDetails } from '../../../api/search';

import { sizes, carousel, colors } from '../../../parameters';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    selectedPlace: PropTypes.object,
    places: PropTypes.array,
    geolocation: PropTypes.object,
    region: PropTypes.object,
    filters: PropTypes.object,
    categories: PropTypes.object,
    me: PropTypes.object,
    gPlace: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      panY: new Animated.Value(-carousel.level2),
      filtersVisible: false,
    };
  }

  componentDidMount() {
    // this.props.dispatch(getGeolocation());
  }

  componentWillReceiveProps({ geolocation }) {
    if (geolocation && geolocation.location
        && !geolocation.loading && this.props.geolocation.loading) {
      this._map.animateToRegion({
        ...geolocation.location,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      }, 1000);
    }
  }

  onMarkerPress = (place) => {
    this.props.dispatch(placeSelect(place));
  }

  onRegionChange = (region) => {
    this.props.dispatch(regionChanged(region));
  }

  onMapPress = () => {
    if (this.props.gPlace) {
      this.onPlacePress(null);
    }
  }

  onMapLongPress = ({ coordinate: { longitude, latitude } }) => {
    this._search.getWrappedInstance().searchCoordinates(`${latitude}, ${longitude}`);
  }

  onPoiClick = (poi) => {
    this.onPlacePress(poiToPlace(poi));
    placeDetails(poi.placeId, poi.name)
      .then((place) => {
        this.onPlacePress(place);
      });
  }

  onPanDrag = () => {}

  onFiltersPress = () => {
    this.setState({ filtersVisible: !this.state.filtersVisible });
  }

  onFiltersChange = (filters) => {
    this.props.dispatch(filtersChange(filters));
  }

  onAddPlace = () => {
    this.onMapLongPress({ coordinate: this.props.geolocation.location });
  }

  onLocationPress = () => {
    this.props.dispatch(getGeolocation());
  }

  onReviewPress = (place) => {
    this.onFiltersChange({ categories: [] });
    this.props.dispatch(placeSelect(place));
    this._map.animateToCoordinate({
      longitude: place.longitude,
      latitude: place.latitude,
    }, 1000);
  }

  onFriendPress = (friend) => {
    this.onFiltersChange({ friend: friend.id || null });
  }

  onAddFriendPress = ({ id }) => {
    this.props.dispatch(sendFriendship({
      from_user_id: this.props.me.id,
      to_user_id: id,
    }));
  }

  onPlacePress = (place) => {
    this.props.dispatch(gPlace(place));
    if (place && place.longitude && place.latitude) {
      this._map.animateToCoordinate(place, 1000);
    }
  }

  zoomOut = () => {
    this._map.zoomBy(-4);
  }

  render() {
    const {
      navigation,
      places,
      region,
      categories,
      filters,
      geolocation,
      selectedPlace,
      gPlace: googlePlace,
    } = this.props;
    const { panY, filtersVisible } = this.state;

    return (
      <Search
        ref={(s) => { this._search = s; }}
        onMenuPress={() => navigation.navigate('DrawerOpen')}
        onReviewPress={this.onReviewPress}
        onFriendPress={this.onFriendPress}
        onAddFriendPress={this.onAddFriendPress}
        onPlacePress={this.onPlacePress}
      >
        <Map
          ref={(m) => { this._map = m; }}
          moveOnMarkerPress={false}
          onPress={this.onMapPress}
          onLongPress={this.onMapLongPress}
          region={region}
          onRegionChangeComplete={this.onRegionChange}
          mapPadding={{
            top: sizes.toolbarHeight,
            bottom: carousel.level2,
          }}
          onPoiClick={this.onPoiClick}
          onPanDrag={this.onPanDrag}
        >
          {googlePlace && (
            <Marker
              key={shortid.generate()}
              place={googlePlace}
              selected={selectedPlace && selectedPlace.id === googlePlace.id}
              onMarkerPress={this.onMarkerPress}
            />
          )}
          {places.map(place => (
            <Marker
              key={shortid.generate()}
              place={place}
              selected={selectedPlace && selectedPlace.id === place.id}
              onMarkerPress={this.onMarkerPress}
            />
          ))}
          {geolocation && geolocation.location && (
            <MarkerPosition
              location={geolocation.location}
              onMarkerPress={location => this.onMapLongPress({ coordinate: location })}
            />
          )}
        </Map>
        <Carousel
          navigation={navigation}
          panY={panY}
          hidden={filtersVisible}
          onAddLocationPress={this.onAddPlace}
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
          <Button fab icon="my-location" onPress={this.onLocationPress} />
        </Animated.View>
        <Filters
          list={categories}
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
              {filters.categories.length ? (
                <Badge text={filters.categories.length} />
              ) : (
                <Icon name="equalizer" set="SimpleLineIcons" style={styles.filterIcon} />
              )}
            </Button>
          </Animated.View>
        </Filters>
      </Search>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  gPlace: state.home.gPlace,
  selectedPlace: state.home.selectedPlace,
  places: selectPlaces(state),
  categories: state.entities.categories,
  geolocation: state.home.geolocation,
  region: state.home.region,
  filters: state.home.filters,
  me: state.auth.me,
});

export default connect(mapStateToProps, bindActions)(Home);

const styles = StyleSheet.create({
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
    zIndex: 1,
  },
  filterButton: {
    height: 40,
  },
  filterIcon: {
    color: colors.black,
  },
});
