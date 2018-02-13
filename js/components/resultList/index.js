import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';

import Text from '../dumbs/text';
import Button from '../dumbs/button';
import List from '../dumbs/list';
import ListItem from '../dumbs/listItem';
import Spinner from '../dumbs/spinner';

import styles from './styles';

const MAX_FRIENDS = 5
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
    friendsSearch: PropTypes.object,
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

  render() {
    const { style, nearbyPlaces, onNearbySelected, searchType, nearbyLoading,
      friendsLoading, placesLoading, reviewsLoading, placesSearch, reviewsSearch,
      friendsSearch, onPlaceSelected, onFriendPress, onReviewPress } = this.props;

    let friendsSearchList = [];

    if (friendsSearch) {
      friendsSearchList = [
        ...friendsSearch.friends,
        ...friendsSearch.friends_friends.map(friend => ({
          ...friend,
          type: 'friends_friends'
        })),
        ...friendsSearch.others.map(other => ({
          ...other,
          type: 'other'
        }))
      ]
    }

    return (
      <ScrollView style={[styles.resultWrapper, style]} keyboardShouldPersistTaps={'always'}>
        <View style={styles.resultView}>
          {(searchType === 'nearby') && (
            <List label="Maybe you were looking for">
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
                  onPress={onNearbySelected}
                >
                  <Text>Add a new place</Text>
                </Button>
              </View>
            </List>
          )}
          {(searchType === 'places') && (
            <View>
              <List label="Résults by friends">
                <View>
                  <Spinner
                    style={styles.spinner}
                    visible={friendsLoading} />
                  {!friendsLoading && friendsSearchList.slice(0, MAX_FRIENDS).map((result, index) => (
                    <ListItem
                      key={index}
                      image='friend'
                      thumbnail={result.picture}
                      text={`${result.first_name} ${result.last_name}`}
                      secondaryText={result.type === 'friends_friends' ? '2nd' : null}
                      other={result.type === 'other'}
                      onPress={() => onFriendPress(result)} />
                  ))}
                </View>
              </List>
              <List label="Résults by reviews">
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
                        secondaryText={review.created_by.first_name}
                        onPress={() => onReviewPress(place, review)} />
                    ))
                  ))}
                </View>
              </List>
              <List label="Résults by Google places">
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
              </List>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default ResultList;
