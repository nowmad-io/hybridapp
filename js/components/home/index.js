import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { select } from '../../../redux-crud-store';
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
    reviews: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.mapRef = null;
  }

  componentWillMount() {
    this._getReviews(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._getReviews(nextProps);
  }

  _getReviews(props) {
    const { reviews } = props;

    if (reviews.needsFetch) {
      this.props.dispatch(reviews.fetch)
    }
  }

  render() {
    const { props: { reviews } } = this;

    return (
      <View style={styles.container}>
        <Map markers={reviews.data}/>
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
  reviews: select(fetchReviews(state, { page: 1 }), state.models),
});

export default connect(mapStateToProps, bindActions)(Home);
