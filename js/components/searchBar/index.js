import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, BackHandler } from 'react-native';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import { colors } from '../../parameters';
import styles from './styles';

const COORD_REGEX = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

class SearchBar extends Component {
  static defaultProps = {
    style: {},
    coordinates: {}
  }

  static propTypes = {
    style: PropTypes.object,
    newPlace: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      empty: true,
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
    console.log('coordinates', coordinates);
    if ( coordinates && coordinates.latitude && coordinates.longitude) {
      return `${coordinates.latitude},${coordinates.longitude}`
    }

    return '';
  }

  onChangeText(text) {
    this.setState({
      empty: !text.length,
      text
    });

    if (!this.state.focused) {
      this.focusInput();
    }
  }

  focusInput() {
    this.setState({
      focused: true,
      previousValue: this.state.text
    });
    this.refs.textInput.focus();
  }

  blurInput() {
    this.setState({
      text: this.state.previousValue
    });
    this.refs.textInput.blur();
  }

  onButtonPress() {
    if (!this.state.empty || this.state.focused) {
      // clean
      this.setState({
        text: '',
        previousValue: '',
      })

      this.blurInput();
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
          {(!state.empty || state.focused) ? (
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
          onFocus={() => this.setState({focused: true})}
          onBlur={() => this.setState({focused: false})}
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
  nearbyPlaces: state.search.nearbyPlaces,
  newPlace: state.home.newPlace
});

export default connect(mapStateToProps, bindActions)(SearchBar);
