import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';

import List from '../../dumbs/list';
import ListItem from '../../dumbs/listItem';
import Spinner from '../../dumbs/spinner';
import Button from '../../dumbs/button';

import { selectFilteredReviews } from '../../../reducers/search';

import { sizes, colors } from '../../../parameters';

const MAX_LIST = 3;

const googleImage = require('../../../../assets/images/icons/google.png');
const placeImage = require('../../../../assets/images/icons/place.png');

class Tab extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
    reviews: PropTypes.array,
    people: PropTypes.array,
    peopleLoading: PropTypes.bool,
    placesEntities: PropTypes.object,
    places: PropTypes.array,
    placesLoading: PropTypes.bool,
  };

  onFriendPress(friend) {
    this.props.screenProps.onFriendPress(friend);
  }

  onReviewPress(review) {
    this.props.screenProps.onReviewPress({
      ...review,
      place: this.props.placesEntities[review.place],
    });
  }

  render() {
    const {
      navigation,
      reviews,
      people, peopleLoading,
      places, placesLoading,
    } = this.props;

    const allPage = navigation.state.routeName === 'All';

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        { people && (
          <List
            label={allPage ? 'RESULTS BY PEOPLE' : null}
            style={styles.list}
            action="see all"
            actionDisable={people.length <= MAX_LIST}
            onActionPress={() => navigation.navigate('People')}
          >
            <Spinner visible={peopleLoading} />
            {!peopleLoading && (allPage ? people.slice(0, MAX_LIST) : people).map(result => (
              <ListItem
                key={result.id}
                text={`${result.first_name} ${result.last_name}`}
                secondaryText={!result.type ? null : (result.type === 'friends_friends' ? '2nd' : '3rd')}
                thumbnail={{ uri: result.picture }}
                disabled={result.type === 'other'}
                onPress={() => (result.type !== 'other') && this.onFriendPress(result)}
              >
                {(result.type === 'friends_friends' || result.type === 'other') && (
                  <Button
                    transparent
                    style={{ height: 24, padding: 0 }}
                    iconStyle={styles.icon}
                    onPress={() => true}
                    icon="person-add"
                  />
                )}
              </ListItem>
            ))}
          </List>
        )}
        { reviews && (
          <List
            label={allPage ? 'RESULTS BY REVIEWS' : null}
            style={styles.list}
            action="see all"
            actionDisable={reviews.length <= MAX_LIST}
            onActionPress={() => navigation.navigate('Reviews')}
          >
            {(allPage ? reviews.slice(0, MAX_LIST) : reviews).map(result => (
              <ListItem
                key={result.id}
                text={result.short_description}
                thumbnail={placeImage}
                onPress={() => this.onReviewPress(result)}
              />
            ))}
          </List>
        )}
        { places && (
          <List
            label={allPage ? 'RESULTS BY PLACES' : null}
            style={styles.list}
            action="see all"
            actionDisable={places.length <= MAX_LIST}
            onActionPress={() => navigation.navigate('Places')}
          >
            <Spinner visible={placesLoading} />
            {!placesLoading && (allPage ? places.slice(0, MAX_LIST) : places).map(result => (
              <ListItem
                key={result.id}
                text={result.name}
                thumbnail={googleImage}
              />
            ))}
          </List>
        )}
      </ScrollView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = (state, props) => {
  const { routeName } = props.navigation.state;

  const reviews = {
    placesEntities: state.entities.places,
    reviews: selectFilteredReviews(state),
  };
  const people = {
    people: state.search.people,
    peopleLoading: state.search.peopleLoading,
  };
  const places = {
    places: state.search.places,
    placesLoading: state.search.placesLoading,
  };

  return {
    ...((routeName === 'All' || routeName === 'Reviews') ? reviews : {}),
    ...((routeName === 'All' || routeName === 'People') ? people : {}),
    ...((routeName === 'All' || routeName === 'Places') ? places : {}),
  };
};

export default connect(mapStateToProps, bindActions)(Tab);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 22,
    flex: 1,
    height: sizes.height,
  },
  list: {
    minHeight: 62,
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    color: colors.green,
  },
});
