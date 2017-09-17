import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View } from 'react-native';
import { select } from 'redux-crud-store';
import Config from 'react-native-config'

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
    const { reviews } = this.props;
    if (reviews.needsFetch) {
      this.props.dispatch(reviews.fetch);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { reviews } = nextProps;

    if (reviews.needsFetch) {
      this.props.dispatch(reviews.fetch)
    }
  }

  render() {
    const { props: { reviews } } = this;
    
    return (
      <View style={styles.container}>
        <Map markers={reviews.data}/>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    dispatch
  };
}

const mapStateToProps = state => ({
  reviews: select(fetchReviews(state, { page: 1 }), state.models),
});

export default connect(mapStateToProps, bindAction)(Home);
