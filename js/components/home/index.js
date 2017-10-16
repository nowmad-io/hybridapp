import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { View, Icon, Fab } from 'native-base';

import { fetchReviews } from '../../api/reviews';
import { setGeolocation } from '../../actions/home';
import Map from '../map';

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    reviews: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.mapRef = null;
  }

  componentDidMount() {
    this.props.dispatch({type: 'TEST'});
    console.log('here ?');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position)
        this.props.dispatch(setGeolocation(position.coords))
      },
      (error) => {console.log('error', error)},
      { timeout: 5000, maximumAge: (60 * 24 * 1000) },
    );
  }

  render() {
    const { props: { reviews } } = this;

    return (
      <View style={styles.container}>
        <Map markers={reviews}/>
        <Fab
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="topRight"
            onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name="ios-menu" />
          </Fab>
      </View>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  reviews: state.home.reviews
});

export default connect(mapStateToProps, bindActions)(Home);
