import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, BackHandler, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { peopleSearch, reviewsSearch, placesSearch } from '../../../api/search';

import SearchRouter from '../../../Routers/SearchRouter';
import Button from '../../dumbs/button';
import LayoutView from '../../dumbs/layoutView';

import { colors, sizes } from '../../../parameters';

class Search extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    dispatch: PropTypes.func,
    onReviewPress: PropTypes.func,
    onFriendPress: PropTypes.func,
    onAddFriendPress: PropTypes.func,
    onPlacePress: PropTypes.func,
    onClear: PropTypes.func,
    onMenuPress: PropTypes.func,
  }

  static defaultProps = {
    onClear: () => true,
  };

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
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.setState({ text: this.state.previousValue });
    this.blur();
    return true;
  }

  onFocus() {
    this.setState({ focused: true });
    this.searchDebounced(this.state.text);
  }

  onChangeText(text, previous = false) {
    this.setState({
      text,
      ...(previous ? { previousValue: text } : {}),
    });
    this.search(text);
  }

  onLeftButtonPress = () => {
    if (this.state.focused) {
      this.onBackPress();
    } else {
      this.focus();
    }
  }

  onClearPress = () => {
    this.props.onFriendPress({});
    this.props.onPlacePress(null);
    this.setState({ text: '', previousValue: '' });
    this.searchDebounced('');
    this.props.onClear();
  }

  onReviewPress = ({ short_description: shortDescription, place }) => {
    this.blur();
    this.props.onPlacePress(null);
    this.props.onFriendPress({});
    this.props.onReviewPress(place);
    this.onChangeText(shortDescription, true);
  }

  onFriendPress = (friend) => {
    this.blur();
    this.props.onPlacePress(null);
    this.props.onFriendPress(friend);
    this.onChangeText(friend.first_name, true);
  }

  onPlacePress = (place) => {
    this.blur();
    this.props.onFriendPress({});
    this.props.onPlacePress(place);
    this.onChangeText(place.name, true);
  };

  onAddFriendPress = (friend) => {
    this.props.onAddFriendPress(friend);
  }

  search = _.debounce(this.searchDebounced, 300)

  searchDebounced(query) {
    this.props.dispatch(peopleSearch(query));
    this.props.dispatch(reviewsSearch(query));
    if (query) {
      this.props.dispatch(placesSearch(query));
    }
  }

  searchCoordinates(coordinatesQuery) {
    this.searchDebounced(coordinatesQuery);
    this.setState({ text: coordinatesQuery });
    if (this._searchRouter) {
      this._searchRouter._navigation.navigate('Places');
    }
    this.setState({ focused: true });
  }

  focus() {
    this.setState({ focused: true });
    this.textInput.focus();
  }

  blur() {
    this.setState({ focused: false });
    this.textInput.blur();
  }

  render() {
    const { children, onMenuPress } = this.props;
    const { text, focused } = this.state;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <Button
            transparent
            style={styles.headerButton}
            onPress={this.onLeftButtonPress}
            icon={focused ? 'arrow-back' : 'search'}
            header
          />

          <TextInput
            ref={(c) => { this.textInput = c; }}
            underlineColorAndroid={focused ? colors.white : colors.transparent}
            autoCorrect={false}
            placeholder="Search friends, reviews & places"
            selectionColor={colors.whiteTransparent}
            placeholderTextColor={colors.white}
            style={styles.searchInput}
            value={text}
            onFocus={() => this.onFocus()}
            onChangeText={t => this.onChangeText(t)}
            withRef
          />

          { text.length > 0 && (
            <Button
              transparent
              style={styles.headerButton}
              onPress={this.onClearPress}
              icon="close"
              header
            />
          )}
          { (!focused || text.length === 0) && (
            <Button
              transparent
              style={styles.headerButton}
              onPress={onMenuPress}
              icon="menu"
              header
            />
          )}
        </LayoutView>
        { children }
        <View
          style={[
            styles.tabs,
            focused && { top: sizes.headerHeight },
          ]}
        >
          <SearchRouter
            ref={(r) => { this._searchRouter = r; }}
            screenProps={{
              onReviewPress: this.onReviewPress,
              onFriendPress: this.onFriendPress,
              onAddFriendPress: this.onAddFriendPress,
              onPlacePress: this.onPlacePress,
            }}
          />
        </View>
      </LayoutView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = null;

export default connect(mapStateToProps, bindActions, null, { withRef: true })(Search);

const styles = StyleSheet.create({
  headerButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
  },
  tabs: {
    ...StyleSheet.absoluteFillObject,
    top: sizes.height,
    backgroundColor: colors.white,
    zIndex: 9,
  },
});
