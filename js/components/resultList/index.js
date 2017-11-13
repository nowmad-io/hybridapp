import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Container, Button } from 'native-base';

import ListCluster from './listCluster';
import ListItem from './listItem';
import Spinner from '../loaders/spinner';

import styles from './styles';

class ResultList extends Component {
  static defaultProps = {
    style: {},
    onNearbySelected: () => true
  }

  static propTypes = {
    style: PropTypes.object,
    onNearbySelected: PropTypes.func,
    searchType: PropTypes.string,
    nearbyLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  onNearbyPress = (result) => {
    const place = {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    }

    this.props.onNearbySelected(place);
  }

  render() {
    const { style, nearbyPlaces, onNearbySelected, searchType, nearbyLoading } = this.props;
    
    return (
      <View style={[styles.resultWrapper, style]}>
        {(searchType === 'nearby') && (
          <ListCluster label="MAYBE YOU WERE LOOKING FOR">
            <View>
              <Spinner
                style={styles.spinner}
                visible={nearbyLoading} />
              {!nearbyLoading && nearbyPlaces.map((result, index) => (
                <ListItem
                  key={index}
                  image='google'
                  text={result.name}
                  onPress={() => this.onNearbyPress(result)} />
              ))}
              <Button
                style={styles.button}
                onPress={() => onNearbySelected()}
              >
                <Text>Add a new place</Text>
              </Button>
            </View>
          </ListCluster>
        )}
      </View>
    )
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  nearbyPlaces: state.search.nearbyPlaces,
  searchType: state.search.searchType,
  nearbyLoading: state.search.nearbyLoading,
});

export default connect(mapStateToProps, bindActions)(ResultList);
