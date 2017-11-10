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
import SearchBar from '../searchBar';

import { selectedPlace, regionChanged, levelChange, selectNewPlace } from '../../actions/home'
import { nearbyPlaces } from '../../api/home'

import styles from './styles';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    places: PropTypes.array,
    position: PropTypes.object,
    level: PropTypes.number,
    selectedPlace: PropTypes.object,
    region: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps({ selectedPlace, level, position }) {
    if (selectedPlace && this.props.selectedPlace
        && selectedPlace.id !== this.props.selectedPlace.id
        && this.props.level === 2 && this._map) {
      const selected = this.props.places.find(function(place, index) {
        if (place.id === selectedPlace.id) {
          return place;
        }
        return false;
      });
      this._map.animateToCoordinate(selected);
    }

    if (position && position.altitude && position.longitude && this._map) {
      this._map.fitToCoordinates([position], { animated: true });
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
    // this.props.dispatch(regionChanged(region));
  }

  onRef = (ref) => {
    this._map = ref;
  }

  onMapReady = () => {
    if (this._map && this.props.selectedPlace) {
      this._map.animateToCoordinate(this.props.selectedPlace);
    }
  }

  onMapLongPress = ({coordinate}) => {
    this.props.dispatch(nearbyPlaces(coordinate));
    this.props.dispatch(selectNewPlace(coordinate));
  }

  render() {
    const { places, position, selectedPlace, region, navigation, newPlace } = this.props;
    return (
      <Container>
        <Header style={styles.header} searchBar={true}>
          <View style={styles.headerView}>
            <SearchBar style={styles.headerInput} />
            <Button
              style={styles.headerButton}
              onPress={() => navigation.navigate('DrawerOpen')}
              transparent
            >
              <Icon name='md-menu' style={[styles.headerIcon, styles.menuIcon]}/>
            </Button>
          </View>
        </Header>
        <Map
          onRef={this.onRef}
          onMapReady={this.onMapReady}
          onLongPress={this.onMapLongPress}
          position={position || region}
          onMarkerPress={this.onMarkerPress}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          { places && places.map(place => (
            <Marker
              key={shortid.generate()}
              selected={selectedPlace.id === place.id}
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
          places={places}
          navigation={navigation}
          onIndexChange={this.onIndexChange}
          onLevelChange={this.onLevelChange}
        />
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  places: state.home.places,
  position: state.home.position,
  selectedPlace: state.home.selectedPlace,
  level: state.home.level,
  region: state.home.region,
  nearbyPlaces: state.home.nearbyPlaces,
  newPlace: state.home.newPlace
});

export default connect(mapStateToProps, bindActions)(Home);
