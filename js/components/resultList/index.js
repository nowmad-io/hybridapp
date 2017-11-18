import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { View, Text, Container, Button } from 'native-base';

import ListCluster from './listCluster';
import ListItem from './listItem';
import Spinner from '../loaders/spinner';

import styles from './styles';


const MAX_FRIENDS = 10
const MAX_REVIEWS = 5

class ResultList extends Component {
  static defaultProps = {
    style: {},
    onNearbySelected: () => true,
    onNearbyPlaceSelected: () => true,
    onReviewPress: () => true,
    onPlaceSelected: () => true
  }

  static propTypes = {
    style: PropTypes.object,
    searchType: PropTypes.string,
    nearbyPlaces: PropTypes.array,
    placesSearch: PropTypes.array,
    reviewsSearch: PropTypes.array,
    friendsSearch: PropTypes.array,
    nearbyLoading: PropTypes.bool,
    friendsLoading: PropTypes.bool,
    reviewsLoading: PropTypes.bool,
    placesLoading: PropTypes.bool,
    onNearbySelected: PropTypes.func,
    onReviewPress: PropTypes.func,
    onPlaceSelected: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  onReviewPress(place) {
    this.props.onReviewPress(place);
  }

  render() {
    const { style, nearbyPlaces, onNearbySelected, searchType, nearbyLoading,
      friendsLoading, placesLoading, reviewsLoading, placesSearch, reviewsSearch,
      friendsSearch, onPlaceSelected } = this.props;

    return (
      <ScrollView style={[styles.resultWrapper, style]} keyboardShouldPersistTaps={'always'}>
        <View style={styles.resultView}>
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
                    onPress={() => this.props.onNearbyPlaceSelected(result)} />
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
          {(searchType === 'places') && (
            <View>
              <ListCluster label="RESULTS BY FRIENDS">
                <View>
                  <Spinner
                    style={styles.spinner}
                    visible={friendsLoading} />
                  {!friendsLoading && friendsSearch.slice(0, MAX_FRIENDS).map((result, index) => (
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
                  {!reviewsLoading && reviewsSearch.slice(0, MAX_REVIEWS).map((place) => (
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
                      text={result.description}
                      onPress={() => onPlaceSelected(result)} />
                  ))}
              </ListCluster>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default ResultList;
