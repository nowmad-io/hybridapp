import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { View, Icon, Fab, Text } from 'native-base';
import shortid from 'shortid';

import Map from '../map';
import Marker from '../marker';
import CarouselList from '../carouselList';

import { selectedPlace } from '../../actions/home'

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    places: PropTypes.array,
    position: PropTypes.object,
    level: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      map: null
    };
  }

  componentWillReceiveProps({ selectedPlace }) {
    if ( selectedPlace && this.props.level === 1 && this._map) {
      const selected = this.props.places.find(function(place, index) {
        if (place.id === selectedPlace) {
          return place;
        }
        return false;
      });
      this._map.animateToCoordinate(selected);
    }
  }

  onMarkerPress = (place) => {
    this.props.dispatch(selectedPlace(place.id));
  }

  onRef = (ref) => {
    this._map = ref;
  }

  render() {
    const { props: { places, position, selectedPlace } } = this;
    return (
      <View style={styles.container}>
        <Map
          onRef={this.onRef}
          position={position}
          onMarkerPress={this.onMarkerPress}
        >
          { places && places.map(place => (
            <Marker
              key={shortid.generate()}
              selected={selectedPlace === place.id}
              place={place}
              onMarkerPress={this.onMarkerPress}
            />
          ))}
        </Map>
        <Fab
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="topRight"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Icon name="ios-menu" />
        </Fab>
        <CarouselList
          data={places}
          customStyle={styles.carousel}
        />
      </View>
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
  level: state.home.level
});

export default connect(mapStateToProps, bindActions)(Home);
