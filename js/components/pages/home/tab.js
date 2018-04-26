import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import List from '../../dumbs/list';
import ListItem from '../../dumbs/listItem';
import Spinner from '../../dumbs/spinner';
import LayoutView from '../../dumbs/layoutView';

const MAX_LIST = 3;

class Tab extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    reviews: PropTypes.array,
    people: PropTypes.array,
    peopleLoading: PropTypes.bool,
    places: PropTypes.array,
    placesLoading: PropTypes.bool,
  };

  render() {
    const {
      navigation: { state: { routeName } },
      reviews,
      people, peopleLoading,
      places, placesLoading,
    } = this.props;

    const allPage = routeName === 'All';

    return (
      <LayoutView type="container" style={styles.container}>
        { people && (
          <List label={allPage ? 'RESULTS BY PEOPLE' : null} style={styles.list} styleWrapper={{ marginTop: 0 }}>
            <Spinner visible={peopleLoading} />
            {!peopleLoading && people.slice(0, MAX_LIST).map(result => (
              <ListItem
                key={result.id}
                text=""
              />
            ))}
          </List>
        )}
        { reviews && (
          <List label={allPage ? 'RESULTS BY REVIEWS' : null} style={styles.list}>
            {reviews.slice(0, MAX_LIST).map(result => (
              <ListItem
                key={result.id}
                text=""
              />
            ))}
          </List>
        )}
        { places && (
          <List label={allPage ? 'RESULTS BY PLACES' : null} style={styles.list}>
            <Spinner visible={placesLoading} />
            {!placesLoading && places.slice(0, MAX_LIST).map(result => (
              <ListItem
                key={result.id}
                text=""
              />
            ))}
          </List>
        )}
      </LayoutView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = (state, props) => {
  const { routeName } = props.navigation.state;

  const reviews = {
    reviews: state.search.reviews,
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
  },
  list: {
    paddingTop: 16,
    minHeight: 52,
  },
});
