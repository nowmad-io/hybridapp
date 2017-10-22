import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { Container, View, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import shortid from 'shortid';

import Map from '../map';
import Marker from '../marker';
import CarouselList from '../carouselList';

import { selectedPlace, regionChanged } from '../../actions/home'

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

    this.state = {
      map: null
    };
  }

  componentWillReceiveProps({ selectedPlace, level }) {
    if (selectedPlace.id !== this.props.selectedPlace.id
        && this.props.level === 1 && this._map) {
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

  onRef = (ref) => {
    this._map = ref;
  }

  onMapReady = () => {
    if (this._map && this.props.selectedPlace) {
      this._map.animateToCoordinate(this.props.selectedPlace);
    }
  }

  onRegionChangeComplete = (region) => {
    // this.props.dispatch(regionChanged(region));
  }

  render() {
    const { props: { places, position, selectedPlace, region } } = this;
    return (
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
              transparent
            >
              <Icon name='md-menu' />
            </Button>
          </Right>
        </Header>
        <Map
          onRef={this.onRef}
          onMapReady={this.onMapReady}
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
        </Map>
        <CarouselList
          places={places}
          customStyle={styles.carousel}
          navigation={this.props.navigation}
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
  region: state.home.region
});

export default connect(mapStateToProps, bindActions)(Home);
