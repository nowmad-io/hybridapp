import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { View, Text, Container, Button } from 'native-base';

import ListCluster from './listCluster';
import ListItem from './listItem';
import Spinner from '../loaders/spinner';

import styles from './styles';

class ResultList extends Component {
  static defaultProps = {
    style: {},
    onNearbySelected: () => true,
    onReviewPress: () => true
  }

  static propTypes = {
    style: PropTypes.object,
    onNearbySelected: PropTypes.func,
    onReviewPress: PropTypes.func,
    searchType: PropTypes.string,
    nearbyLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  onNearbyPress(result) {
    const place = {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    }

    this.props.onNearbySelected(place);
  }

  onReviewPress(place) {
    this.props.onReviewPress(place);
  }

  render() {
    const { style, nearbyPlaces, onNearbySelected, searchType, nearbyLoading,
      friendsLoading, placesLoading, reviewsLoading, placesSearch, reviewsSearch,
      friendsSearch } = this.props;

    return (
      <ScrollView style={[styles.resultWrapper, style]} keyboardShouldPersistTaps={'always'}>
        <View>
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
          {(searchType === 'search') && (
            <View>
              <ListCluster label="RESULTS BY FRIENDS">
                <View>
                  <Spinner
                    style={styles.spinner}
                    visible={friendsLoading} />
                  {!friendsLoading && friendsSearch.map((result, index) => (
                    <ListItem
                      key={index}
                      image='friend'
                      text={`${result.first_name} ${result.last_name}`}
                      onPress={() => this.onFriendPress(result)} />
                  ))}
                </View>
              </ListCluster>
              <ListCluster label="RESULTS BY REVIEWS">
                <View>
                  <Spinner
                    style={styles.spinner}
                    visible={reviewsLoading} />
                  {!reviewsLoading && reviewsSearch.map((place) => (
                    place.reviews.map((review, index) =>(
                      <ListItem
                        key={index}
                        image='place'
                        text={review.short_description}
                        onPress={() => this.onReviewPress(place)} />
                    ))
                  ))}
                </View>
              </ListCluster>
              <ListCluster label="RESULTS BY GOOGLE PLACES">
                  <Spinner
                    style={styles.spinner}
                    visible={placesLoading} />
                  {!placesLoading && placesSearch.map((result, index) => (
                    <ListItem
                      key={index}
                      image='google'
                      text={result.primaryText}
                      onPress={() => this.onPlacePress(result)} />
                  ))}
              </ListCluster>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  nearbyPlaces: state.search.nearbyPlaces,
  placesSearch: state.search.placesSearch,
  reviewsSearch: state.search.reviewsSearch,
  friendsSearch: state.search.friendsSearch,
  searchType: state.search.searchType,
  nearbyLoading: state.search.nearbyLoading,
  friendsLoading: state.search.friendsLoading,
  reviewsLoading: state.search.reviewsLoading,
  placesLoading: state.search.placesLoading,
});

export default connect(mapStateToProps, bindActions)(ResultList);
