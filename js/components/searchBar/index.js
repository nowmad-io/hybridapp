import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import { Button, Icon } from 'native-base';

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
    coordinates: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      empty: true,
      text: ''
    }
  }

  componentWillReceiveProps({ coordinates }) {
    const newCoords = this.coordinatesToString(coordinates),
          currentCoords = this.coordinatesToString(this.props.coordinates);

          console.log('newCoords', newCoords);
          console.log('currentCoords', currentCoords);
    if (!this.state.focused && newCoords !== currentCoords) {
      this.onChangeText(newCoords);
    }
  }

  coordinatesToString(coordinates) {
    console.log('coordinates', coordinates);
    if (coordinates.latitude && coordinates.longitude) {
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
      this.setState({focused: true});
      this.refs.textInput.focus();
    }
  }

  onButtonPress() {
    if (!this.state.empty || this.state.focused) {
      // clean
      this.setState({
        text: '',
        empty: true,
        focused: false
      })

      this.refs.textInput.blur();
    } else {
      this.refs.textInput.focus();
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
          onFocus={() => this.setState({focused: true})}
          onBlur={() => this.setState({focused: false})}
          onChangeText={(text) => this.onChangeText(text)}
          withRef />
      </View>
    )
  }
}

export default SearchBar;
