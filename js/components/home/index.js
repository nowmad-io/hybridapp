import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config'
import { View, Icon, Fab } from 'native-base';

import { fetchReviews } from '../../api/reviews';
import Map from '../map';

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    reviews: PropTypes.array,
    position: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { props: { reviews, position } } = this;
    return (
      <View style={styles.container}>
        <Map
          markers={reviews}
          position={position}
        />
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
  reviews: state.home.reviews,
  position: state.home.position
});

export default connect(mapStateToProps, bindActions)(Home);
