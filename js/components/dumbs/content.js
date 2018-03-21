import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { colors, sizes } from '../../parameters';

export default class Content extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  	disableKBDismissScroll: PropTypes.bool,
  	enableResetScrollToCoords: PropTypes.bool,
  	keyboardShouldPersistTaps: PropTypes.string,
  };

  render() {
    const { style } = this.props;

    return (
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        resetScrollToCoords={this.props.disableKBDismissScroll ? null : { x: 0, y: 0 }}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps ? this.props.keyboardShouldPersistTaps : 'handled'}
        {...this.props}
        style={[styles.content, style]}
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
