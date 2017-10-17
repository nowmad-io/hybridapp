import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import { entryStyles } from './styles';

class Entry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image () {
    const { data: { illustration }, parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[entryStyles.imageContainer, even ? entryStyles.imageContainerEven : {}]}
        style={[entryStyles.image, { position: 'relative' }]}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps} />
    ) : (
      <Image
        source={{ uri: illustration }}
        style={entryStyles.image} />
    );
  }

  render () {
    const { data: { title, subtitle }, even } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[entryStyles.title, even ? entryStyles.titleEven : {}]}
        numberOfLines={2}
      >
        { title.toUpperCase() }
      </Text>
    ) : false;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={entryStyles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${title}'`); }}
      >
        <View style={[entryStyles.textContainer, even ? entryStyles.textContainerEven : {}]}>
          { uppercaseTitle }
        </View>
        <View style={[entryStyles.textContainer, even ? entryStyles.textContainerEven : {}]}>
          { uppercaseTitle }
        </View>
        <View style={[entryStyles.textContainer, even ? entryStyles.textContainerEven : {}]}>
          { uppercaseTitle }
        </View>
        <View style={[entryStyles.textContainer, even ? entryStyles.textContainerEven : {}]}>
          { uppercaseTitle }
        </View>
        <View style={[entryStyles.textContainer, even ? entryStyles.textContainerEven : {}]}>
          { uppercaseTitle }
        </View>
        <View style={[entryStyles.textContainer, even ? entryStyles.textContainerEven : {}]}>
          { uppercaseTitle }
        </View>
        <View style={[entryStyles.imageContainer, even ? entryStyles.imageContainerEven : {}]}>
          { this.image }
          <View style={[entryStyles.radiusMask, even ? entryStyles.radiusMaskEven : {}]} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Entry
