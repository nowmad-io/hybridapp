import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, BackHandler, Keyboard } from 'react-native';
import { Container, Header, Text, Button, Icon, View } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';

import { nearby, nearbyLoading, placesLoading,
  friendsLoading, reviewsLoading } from '../../actions/search';
import { getNearbyPlaces, placesSearch, placeDetails } from '../../api/search';
import { friendsSearch } from '../../api/friends';
import { reviewsSearch } from '../../api/reviews';

import ResultList from '../resultList';

import { colors } from '../../parameters';
import styles from './styles';

const COORD_REGEX = /^([-+]?[\d]{1,2}\.\d+),\s*([-+]?[\d]{1,3}\.\d+)?$/;

class SearchWrapper extends Component {
  static defaultProps = {
    onClear: () => true,
  }

  static propTypes = {
    children: PropTypes.array,
    searchType: PropTypes.string,
    nearbyPlaces: PropTypes.array,
    placesSearch: PropTypes.array,
    reviewsSearch: PropTypes.array,
    friendsSearch: PropTypes.array,
    nearbyLoading: PropTypes.bool,
    friendsLoading: PropTypes.bool,
    reviewsLoading: PropTypes.bool,
    placesLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      previousValue: '',
      focused: false,
      searchType: 'places'
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  coordinatesToString(coordinates) {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      return `${coordinates.latitude},${coordinates.longitude}`
    }

    return '';
  }

  componentWillReceiveProps() {}

  searchCoordinates(coords, init) {
    const parsedCoords = this.coordinatesToString(coords);

    this.setState({
      text : parsedCoords,
      previousValue: parsedCoords
    });

    if (!init) {
      this.onChangeText(parsedCoords);
    }
  }

  setValue(text) {
    this.setState({
      text,
      previousValue: text
    });
  }

  focusInput() {
    this.setState({ focused: true });
    this.refs.textInput.focus();
  }

  blurInput() {
    this.setState({ focused: false });
    this.refs.textInput.blur();
  }

  getAutocomplete(text) {
    this.props.dispatch(friendsLoading(true));
    this.props.dispatch(friendsSearch(text));

    this.props.dispatch(reviewsLoading(true));
    this.props.dispatch(reviewsSearch(text));

    this.props.dispatch(placesLoading(true));
    this.props.dispatch(placesSearch(text));
  }

  onBackPress = () => {
    if (this.state.focused) {
      this.setState({text: this.state.previousValue})
      this.blurInput();
      return true;
    }
  }

  onFocus() {
    this.setState({ focused: true });

    this.search(this.state.text);
  }

  getAutocompleteDebounce = _.debounce((text) => this.getAutocomplete(text), 500)

  onChangeText(text, preventFocus) {
    this.setState({text});

    if (!this.props.focused && !preventFocus) {
      this.focusInput();
    }

    this.search(text)
  }

  search(query) {
    const text = query || this.state.text;

    const coord = COORD_REGEX.exec(text)
    if (coord && coord.length >= 3) {
      Keyboard.dismiss();

      if (this.state.searchType !== 'nearby') {
        this.setState({ searchType: 'nearby' });
      }

      this.props.dispatch(nearbyLoading(true));
      this.props.dispatch(getNearbyPlaces({
        latitude: coord[1],
        longitude: coord[2]
      }));
    } else {
      if (this.state.searchType !== 'places') {
        this.setState({ searchType: 'places' });
      }

      this.getAutocompleteDebounce(text);
    }
  }

  clear() {
    this.setState({ text: '' });
    this.props.onClear();
  }

  gPlaceToPlace(gPlace) {
    return gPlace ? {
      ...gPlace,
      id: gPlace.place_id,
      address: gPlace.vicinity,
      latitude: gPlace.geometry.location.lat,
      longitude: gPlace.geometry.location.lng,
      reviews: [{
        created_by: {
          first_name: gPlace.name
        },
        short_description: gPlace.types ? gPlace.types.join(', ') : '',
        categories: [],
        pictures: []
      }]
    } : null;
  }

  onActionPress() {
    if (this.state.focused) {
      this.onBackPress();
    } else if (this.state.text.length) {
      this.clear();
    } else {
      this.focusInput();
    }
  }

  onNearbySelected = (gPlace) => {
    this.props.onNearbySelected(this.gPlaceToPlace(gPlace));
  }

  onPlaceSelected = (gPlace) => {
    return placeDetails(gPlace.place_id)
      .then((response) => response.json())
      .then(({result}) => {
        console.log('result', result);
        this.props.onPlaceSelected(this.gPlaceToPlace(result));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onNearbyPlaceSelected = (gPlace) => {
    this.props.onNearbyPlaceSelected(this.gPlaceToPlace(gPlace));
  }

  onSubmitEditing() {
    if (this.props.placesSearch.length) {
      return placeDetails(this.props.placesSearch[0].place_id)
        .then((response) => response.json())
        .then(({result}) => {
          this.props.onPlacesSelected(this.gPlaceToPlace(result), this.props.reviewsSearch);
          this.blurInput();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    this.props.onPlacesSelected(null, this.props.reviewsSearch)
    this.blurInput();
  }

  render() {
    const { props, state} = this;

    return (
      <Container>
        <Header style={styles.header} searchBar={true}>
          <View style={styles.headerView}>
            <Button
              transparent
              style={styles.headerButton}
              onPress={() => this.onActionPress()}
            >
              {state.focused ? (
                <Icon name='md-arrow-back' style={styles.headerIcon}/>
              ) : state.text.length ? (
                <Icon name='md-close' style={styles.headerIcon}/>
              ) : (
                <Icon name='md-search' style={styles.headerIcon}/>
              )}
            </Button>

            <TextInput
              ref='textInput'
              underlineColorAndroid={state.focused ? colors.white : colors.transparent}
              autoCorrect={false}
              placeholder={'Search friends, reviews & places'}
              selectionColor={colors.whiteTransparent}
              placeholderTextColor={colors.white}
              style={styles.searchInput}
              value={state.text}
              onSubmitEditing={() => this.onSubmitEditing()}
              onFocus={() => this.onFocus()}
              onChangeText={(text) => this.onChangeText(text)}
              withRef />

            <Button
              style={styles.headerButton}
              onPress={() => this.onDrawerPress()}
              transparent
            >
              <Icon name='md-menu' style={[styles.headerIcon, styles.menuIcon]} />
            </Button>
          </View>
        </Header>

        {this.props.children}

        { state.focused && (
          <ResultList
            style={styles.resultList}
            searchType={state.searchType}
            nearbyPlaces={props.nearbyPlaces}
            placesSearch={props.placesSearch}
            reviewsSearch={props.reviewsSearch}
            friendsSearch={props.friendsSearch}
            nearbyLoading={props.nearbyLoading}
            friendsLoading={props.friendsLoading}
            reviewsLoading={props.reviewsLoading}
            placesLoading={props.placesLoading}
            onReviewPress={this.onReviewPress}
            onPlaceSelected={this.onPlaceSelected}
            onNearbySelected={this.onNearbySelected}
            onNearbyPlaceSelected={this.onNearbyPlaceSelected}
            />
        )}
      </Container>
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

export default connect(mapStateToProps, bindActions, null, { withRef: true })(SearchWrapper);
