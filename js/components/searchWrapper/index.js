import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, BackHandler, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getNearbyPlaces, gplacesSearch, placeDetails, gPlaceToPlace } from '../../api/search';
import { friendsSearch } from '../../api/friends';
import { reviewsSearchByQuery, reviewsSearchByUser } from '../../api/reviews';

import Button from '../dumbs/button';
import LayoutView from '../dumbs/layoutView';
import ResultList from '../resultList';

import { colors } from '../../parameters';
import styles from './styles';

const COORD_REGEX = /^([-+]?[\d]{1,2}\.\d+),\s*([-+]?[\d]{1,3}\.\d+)?$/;

class SearchWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    dispatch: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClear: PropTypes.func,
    onMenuPress: PropTypes.func,
    onReviewPress: PropTypes.func,
    onNearbySelected: PropTypes.func,
    onPlaceSelected: PropTypes.func,
    onNearbyPlaceSelected: PropTypes.func,
    onPlacesSelected: PropTypes.func,
    onFriendPress: PropTypes.func,
    nearbyPlaces: PropTypes.array,
    placesSearch: PropTypes.array,
    reviewsSearch: PropTypes.array,
    friendsSearch: PropTypes.object,
    nearbyLoading: PropTypes.bool,
    friendsLoading: PropTypes.bool,
    reviewsLoading: PropTypes.bool,
    placesLoading: PropTypes.bool,
  }

  static coordinatesToString(coordinates) {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      return `${coordinates.latitude},${coordinates.longitude}`;
    }

    return '';
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      previousValue: '',
      focused: false,
      searchType: 'places',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUpdate(nextProps, { focused }) {
    if (focused && !this.state.focused) {
      this.props.onFocus();
    } else if (!focused && this.state.focused) {
      this.props.onBlur();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (this.state.focused) {
      this.setState({ text: this.state.previousValue });
      this.blurInput();
    }
    return true;
  }

  onNearbySelected = () => {
    const coord = COORD_REGEX.exec(this.state.text);

    this.props.onNearbySelected({
      latitude: +coord[1],
      longitude: +coord[2],
    });
  }

  onPlaceSelected = gPlace => placeDetails(gPlace.place_id)
    .then(response => response.json())
    .then(({ result }) => {
      this.props.onPlaceSelected(gPlaceToPlace(result));
    });

  onNearbyPlaceSelected = (gPlace) => {
    this.props.onNearbyPlaceSelected(gPlaceToPlace(gPlace));
  }

  onFriendPress = (user) => {
    this.props.dispatch(reviewsSearchByUser(user.email));
    this.props.onFriendPress(user);
  }

  onFocus() {
    this.setState({ focused: true });
    this.search(this.state.text);
  }

  onChangeText(text, preventFocus) {
    this.setState({ text });

    if (!this.state.focused && !preventFocus) {
      this.focusInput();
    }

    this.search(text);
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

  onSubmitEditing() {
    if (this.props.placesSearch.length) {
      placeDetails(this.props.placesSearch[0].place_id)
        .then(response => response.json())
        .then(({ result }) => {
          this.props.onPlacesSelected(gPlaceToPlace(result), this.props.reviewsSearch);
          this.blurInput();
        });
    } else {
      this.props.onPlacesSelected(null, this.props.reviewsSearch);
      this.blurInput();
    }
  }

  getAutocompleteDebounce = _.debounce(this.getAutocomplete, 300)

  getAutocomplete(text) {
    this.props.dispatch(friendsSearch(text));
    this.props.dispatch(reviewsSearchByQuery(text));
    this.props.dispatch(gplacesSearch(text));
  }

  setValue(text) {
    this.setState({
      text,
      previousValue: text,
    });
  }

  focusInput() {
    this.setState({ focused: true });
    this.textInput.focus();
  }

  blurInput() {
    this.setState({ focused: false });
    this.textInput.blur();
  }

  searchCoordinates(coords, init) {
    const parsedCoords = SearchWrapper.coordinatesToString(coords);

    this.setState({
      text: parsedCoords,
      previousValue: parsedCoords,
    });

    if (!init) {
      this.onChangeText(parsedCoords);
    }
  }

  search(query) {
    const text = query === null ? this.state.text : query;

    const coord = COORD_REGEX.exec(text);
    if (coord && coord.length >= 3) {
      Keyboard.dismiss();

      if (this.state.searchType !== 'nearby') {
        this.setState({ searchType: 'nearby' });
      }

      this.props.dispatch(getNearbyPlaces({
        latitude: coord[1],
        longitude: coord[2],
      }));
    } else {
      if (this.state.searchType !== 'places') {
        this.setState({ searchType: 'places' });
      }

      this.getAutocompleteDebounce(text);
    }
  }

  clear() {
    this.setState({
      text: '',
      previousValue: '',
    });
    this.props.onClear();
  }

  render() {
    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <Button
            transparent
            style={styles.headerButton}
            onPress={() => this.onActionPress()}
            icon={this.state.focused ? 'arrow-back' : this.state.text.length ? 'close' : 'search'}
            header
          />

          <TextInput
            ref={(c) => { this.textInput = c; }}
            underlineColorAndroid={this.state.focused ? colors.white : colors.transparent}
            autoCorrect={false}
            placeholder="Search friends, reviews & places"
            selectionColor={colors.whiteTransparent}
            placeholderTextColor={colors.white}
            style={styles.searchInput}
            value={this.state.text}
            onSubmitEditing={() => this.onSubmitEditing()}
            onFocus={() => this.onFocus()}
            onChangeText={text => this.onChangeText(text)}
            withRef
          />

          <Button
            transparent
            style={styles.headerButton}
            onPress={this.props.onMenuPress}
            icon="menu"
            header
          />
        </LayoutView>

        {this.props.children}

        { this.state.focused && (
          <ResultList
            style={styles.resultList}
            searchType={this.state.searchType}
            nearbyPlaces={this.props.nearbyPlaces}
            placesSearch={this.props.placesSearch}
            reviewsSearch={this.props.reviewsSearch}
            friendsSearch={this.props.friendsSearch}
            nearbyLoading={this.props.nearbyLoading}
            friendsLoading={this.props.friendsLoading}
            reviewsLoading={this.props.reviewsLoading}
            placesLoading={this.props.placesLoading}
            onFriendPress={this.onFriendPress}
            onReviewPress={this.props.onReviewPress}
            onPlaceSelected={this.onPlaceSelected}
            onNearbySelected={this.onNearbySelected}
            onNearbyPlaceSelected={this.onNearbyPlaceSelected}
          />
        )}
      </LayoutView>
    );
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
  nearbyLoading: state.search.nearbyLoading,
  friendsLoading: state.search.friendsLoading,
  reviewsLoading: state.search.reviewsLoading,
  placesLoading: state.search.placesLoading,
});

export default connect(mapStateToProps, bindActions, null, { withRef: true })(SearchWrapper);
