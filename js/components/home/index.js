import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { View, Icon, Fab, Text } from 'native-base';

import Map from '../map';
import CarouselList from '../carouselList';

import { fetchReviews } from '../../api/reviews';

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    reviews: PropTypes.array,
    position: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { props: { places, position } } = this;
    return (
      <View style={styles.container}>
        <Map
          places={places}
          position={position}
        />
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
  position: state.home.position
});

export default connect(mapStateToProps, bindActions)(Home);
