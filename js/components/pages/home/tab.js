import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View } from 'react-native';

import { addFriendsEvent } from '../../../libs/mixpanel';

import LayoutView from '../../dumbs/layoutView';
import List from '../../dumbs/list';
import ListItem from '../../dumbs/listItem';
import Spinner from '../../dumbs/spinner';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';

import { placeDetails, COORD_REGEX } from '../../../actions/search';
import { acceptFriendship, rejectFriendship, cancelFriendship } from '../../../actions/friends';
import { selectPeople } from '../../../reducers/search';

import { colors, font } from '../../../parameters';

const MAX_LIST = 3;

const googleImage = require('../../../../assets/images/icons/google.png');

class Tab extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
    people: PropTypes.array,
    peopleLoading: PropTypes.bool,
    places: PropTypes.array,
    placesLoading: PropTypes.bool,
    nbFriends: PropTypes.number,
    nbIncomings: PropTypes.number,
    nbOutgoings: PropTypes.number,
  };

  onFriendPress = (friend) => {
    this.props.screenProps.onFriendPress(friend);
  }

  onAddFriendPress = friend => () => {
    const { nbFriends, nbIncomings, nbOutgoings } = this.props;

    addFriendsEvent({
      nbFriends,
      nbIncomings,
      nbOutgoings,
    });

    this.props.screenProps.onAddFriendPress(friend);
  }

  onAcceptPress = id => () => {
    this.props.dispatch(acceptFriendship(id));
  }

  onRejectPress = id => () => {
    this.props.dispatch(rejectFriendship(id));
  }

  onCancelPress = id => () => {
    this.props.dispatch(cancelFriendship(id));
  }

  onPlacePress = ({ place_id: placeId }) => () => {
    placeDetails(placeId)
      .then(place => this.props.screenProps.onPlacePress(place));
  }

  onAddThisPlacePress = coord => () => {
    this.props.screenProps.onAddThisPlacePress(coord);
  }

  render() {
    const {
      navigation,
      screenProps: { text },
      people, peopleLoading,
      places, placesLoading,
    } = this.props;

    let coord = COORD_REGEX.exec(text);
    coord = coord && coord.length >= 3 && {
      latitude: coord[1],
      longitude: coord[2],
    };

    const allPage = navigation.state.routeName === 'All';

    return (
      <LayoutView type="container">
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
                  {(result.type === 'friends_friends' || result.type === 'other')
                    && (!result.outgoing && !result.incoming) && (
                    <Button
                      transparent
                      style={{ height: 24, padding: 0 }}
                      iconStyle={styles.icon}
                      onPress={this.onAddFriendPress(result)}
                      icon="person-add"
                    />
                  )}
                  {(result.type === 'friends_friends' || result.type === 'other')
                    && result.outgoing && (
                      <Button
                        transparent
                        style={{ height: 24, padding: 0 }}
                        onPress={this.onCancelPress(result.outgoing.id)}
                      >
                        <Text style={styles.text}>Cancel</Text>
                      </Button>
                  )}
                  {(result.type === 'friends_friends' || result.type === 'other')
                    && result.incoming && (
                      <View style={{ flexDirection: 'row' }}>
                        <Button
                          transparent
                          icon="close"
                          style={styles.requestButton}
                          iconStyle={styles.requestIcon}
                          onPress={this.onRejectPress(result.incoming.id)}
                        />
                        <Button
                          transparent
                          icon="check"
                          style={styles.requestButton}
                          iconStyle={styles.requestIcon}
                          onPress={this.onAcceptPress(result.incoming.id)}
                        />
                      </View>
                  )}
                </ListItem>
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
              <Text style={styles.poweredGoogle}>Powered by Google</Text>
              <Spinner visible={placesLoading} />
              {!placesLoading && (allPage ? places.slice(0, MAX_LIST) : places).map(result => (
                <ListItem
                  key={result.id}
                  text={result.name}
                  thumbnail={googleImage}
                  onPress={this.onPlacePress(result)}
                />
              ))}
            </List>
          )}
        </ScrollView>
        {places && !allPage && coord && (
          <Button
            style={styles.button}
            onPress={this.onAddThisPlacePress(coord)}
          >
            <Text uppercase={false} style={styles.buttonText}>
              None of the above,
            </Text>
            <Text>
              Add a new place
            </Text>
          </Button>
        )}
      </LayoutView>
    );
  }
}

const makeMapStateToProps = () => {
  const peopleSelector = selectPeople();

  return (state, props) => {
    const { routeName } = props.navigation.state;

    const people = {
      people: peopleSelector(state),
      peopleLoading: state.search.peopleLoading,
      nbFriends: state.friends.all.length,
      nbIncomings: state.friends.incomings.length,
      nbOutgoings: state.friends.outgoings.length,
    };
    const places = {
      places: state.search.places,
      placesLoading: state.search.placesLoading,
    };

    return {
      ...((routeName === 'All' || routeName === 'People') ? people : {}),
      ...((routeName === 'All' || routeName === 'Places') ? places : {}),
    };
  };
};

export default connect(makeMapStateToProps)(Tab);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 22,
    flex: 1,
  },
  list: {
    minHeight: 62,
    marginBottom: 16,
  },
  poweredGoogle: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    color: colors.green,
  },
  text: {
    fontSize: 14,
    fontWeight: font.fontWeight.light,
    color: colors.green,
  },
  requestButton: {
    height: 20,
    width: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 50,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestIcon: {
    color: colors.green,
    fontSize: 14,
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  buttonText: {
    marginRight: 4,
  },
});
