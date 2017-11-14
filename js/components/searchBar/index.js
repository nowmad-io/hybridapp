import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, BackHandler, Keyboard } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import { setFocus, nearby, searchType } from '../../actions/search'
import { getNearbyPlaces } from '../../api/search'
import { colors } from '../../parameters';
import styles from './styles';

const COORD_REGEX = /^([-+]?[\d]{1,2}\.\d+),\s*([-+]?[\d]{1,3}\.\d+)?$/;

class SearchBar extends Component {
  static defaultProps = {
    style: {},
    onClear: () => true
  }

  static propTypes = {
    style: PropTypes.object,
    newPlace: PropTypes.object,
    onClear: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      previousValue: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    if (this.props.newPlace) {
      this.onChangeText(this.coordinatesToString(this.props.newPlace), true);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (this.props.focused) {
      this.blurInput();
      return true;
    }
  }

  componentWillReceiveProps({ newPlace, focused }) {
    const newCoords = this.coordinatesToString(newPlace),
          currentCoords = this.coordinatesToString(this.props.newPlace);

    if (newPlace && newCoords !== currentCoords) {
      this.onChangeText(newCoords);
    }

    if (focused !== this.props.focused) {
      if (focused) {
        this.focusInput();
      } else {
        this.blurInput();
      }
    }
  }

  coordinatesToString(coordinates) {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      return `${coordinates.latitude},${coordinates.longitude}`
    }

    return '';
  }

  onChangeText(text, preventFocus) {
    this.setState({text});

    if (!this.props.focused && !preventFocus) {
      this.focusInput();
    }

    const coord = COORD_REGEX.exec(text)
    if (coord && coord.length >= 3) {
      Keyboard.dismiss();

      this.props.dispatch(searchType('nearby'));

      this.props.dispatch(getNearbyPlaces({
        latitude: coord[1],
        longitude: coord[2]
      }));
    }
  }

  focusInput(nativeEvent) {
    this.setState({
      previousValue: this.state.text
    });
    if (!nativeEvent) {
      this.refs.textInput.focus();
    }
    this.props.dispatch(setFocus(true));
  }

  blurInput(clear) {
    this.setState({
      text: !clear ? this.state.previousValue : ''
    });

    this.props.dispatch(setFocus(false));
    this.refs.textInput.blur();
  }

  onButtonPress() {
    if (this.state.text.length || this.props.focused) {
      this.setState({
        previousValue: '',
      })

      this.onClear();
      this.blurInput(true);
    } else {
      this.focusInput();
    }
  }

  onClear = () => {
    this.props.onClear();
    this.props.dispatch(nearby(null));
  }

  render() {
    const { props, state} = this;

    return (
      <View style={[styles.searchWrapper, props.style]}>
        <Button
          transparent
          style={styles.inputButton}
          onPress={() => this.onButtonPress()}
        >
          {(state.text.length || props.focused) ? (
            <Icon name='md-close' style={styles.inputIcon}/>
          ) : (
            <Icon name='md-search' style={styles.inputIcon}/>
          )}
        </Button>
        <TextInput
          ref='textInput'
          underlineColorAndroid={props.focused ? colors.white : colors.transparent}
          autoCorrect={false}
          placeholder={'Search friends, reviews & places'}
          selectionColor={colors.whiteTransparent}
          placeholderTextColor={colors.white}
          style={styles.searchInput}
          value={state.text}
          onFocus={() => this.focusInput(true)}
          onChangeText={(text) => this.onChangeText(text)}
          withRef />
      </View>
    )
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  newPlace: state.home.newPlace,
  focused: state.search.focused
});

export default connect(mapStateToProps, bindActions)(SearchBar);
