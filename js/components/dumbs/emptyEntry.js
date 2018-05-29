import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Button from './button';
import Text from './text';

import { colors, carousel } from '../../parameters';

export default class EmptyEntry extends PureComponent {
  static propTypes = {
    onAddLocationPress: PropTypes.func,
    onSharePress: PropTypes.func,
  };

  render() {
    const { onAddLocationPress, onSharePress } = this.props;

    return (
      <View style={styles.card}>
        <Button
          style={[
            styles.button,
            { marginBottom: 14 },
          ]}
          onPress={onAddLocationPress}
        >
          <Text style={styles.text}>
            Add your location
          </Text>
        </Button>
        <Button
          style={styles.button}
          onPress={onSharePress}
        >
          <Text style={styles.text}>
            Ask a friend about this area
          </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: carousel.level2,
    backgroundColor: colors.yellowDark,
    position: 'relative',
    borderColor: colors.yellowDark,
    borderTopWidth: carousel.border,
    borderRadius: 2,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    width: '100%',
    backgroundColor: colors.whiteTransparentLight,
  },
  text: {
    color: colors.black,
  },
});
