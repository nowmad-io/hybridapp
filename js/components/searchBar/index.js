import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, BackHandler, Keyboard } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import { getNearbyPlaces } from '../../api/search'
import { colors } from '../../parameters';
import styles from './styles';

const COORD_REGEX = /^([-+]?[\d]{1,2}\.\d+),\s*([-+]?[\d]{1,3}\.\d+)?$/;

class SearchBar extends Component {
  static defaultProps = {
    style: {},
    onFocus: () => true,
    onBlur: () => true,
    onClear: () => true
  }

  static propTypes = {
    style: PropTypes.object,
    newPlace: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClear: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      text: '',
      previousValue: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (this.state.focused) {
      this.blurInput();
      return true;
    }
  }

  componentWillReceiveProps({ newPlace }) {
    const newCoords = this.coordinatesToString(newPlace),
          currentCoords = this.coordinatesToString(this.props.newPlace);

    if (newCoords !== currentCoords) {
      this.onChangeText(newCoords);
    }
  }

  coordinatesToString(coordinates) {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      return `${coordinates.latitude},${coordinates.longitude}`
    }

    return '';
  }

  onChangeText(text) {
    this.setState({text});

    if (!this.state.focused) {
      this.focusInput();
    }

    const coord = COORD_REGEX.exec(text)
    if (coord && coord.length >= 3) {
      Keyboard.dismiss();

      this.props.dispatch(getNearbyPlaces({
        latitude: coord[1],
        longitude: coord[2]
      }));
    }
  }

  focusInput(nativeEvent) {
    this.setState({
      focused: true,
      previousValue: this.state.text
    });
    if (!nativeEvent) {
      this.refs.textInput.focus();
    }
    this.props.onFocus();
  }

  blurInput(clear) {
    this.setState({
      focused: false,
      text: !clear ? this.state.previousValue : ''
    });

    this.props.onBlur();
    this.refs.textInput.blur();
  }

  onButtonPress() {
    if (this.state.text.length || this.state.focused) {
      this.setState({
        previousValue: '',
      })

      this.props.onClear();
      this.blurInput(true);
    } else {
      this.focusInput();
    }
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
          {(state.text.length || state.focused) ? (
            <Icon name='md-close' style={styles.inputIcon}/>
          ) : (
            <Icon name='md-search' style={styles.inputIcon}/>
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
  newPlace: state.home.newPlace
});

export default connect(mapStateToProps, bindActions)(SearchBar);
