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

class SearchWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    dispatch: PropTypes.func,
    onClear: PropTypes.func,
    onMenuPress: PropTypes.func,
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
    this.search(this.state.text);
  }

  onChangeText(text) {
    this.setState({ text });
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
    this.setState({ text: '', previousValue: '' });
    this.props.onClear();
  }

  search = _.debounce(this.searchDebounced, 300)

  searchDebounced(query) {
    this.props.dispatch(peopleSearch(query));
    this.props.dispatch(reviewsSearch(query));
    if (query) {
      this.props.dispatch(placesSearch(query));
    }
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
            { top: sizes.headerHeight },
          ]}
        >
          <SearchRouter />
        </View>
      </LayoutView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  nearbyPlaces: state.search.nearbyPlaces,
  reviewsSearch: state.search.reviewsSearch,
  friendsSearch: state.search.friendsSearch,
  nearbyLoading: state.search.nearbyLoading,
  friendsLoading: state.search.friendsLoading,
  reviewsLoading: state.search.reviewsLoading,
  placesLoading: state.search.placesLoading,
});

export default connect(mapStateToProps, bindActions, null, { withRef: true })(SearchWrapper);

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
