import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, Image, View, StyleSheet, Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Config from 'react-native-config';

import Icon from './icon';
import Spinner from './spinner';

import { colors } from '../../parameters';

export default class ProfilePicker extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    onPictureSelected: PropTypes.func,
    uri: PropTypes.string,
  };

  static defaultProps = {
    onPictureSelected: () => true,
  }

  constructor(props) {
    super(props);

    this.state = {
      addingImage: false,
    };
  }

  onPress = () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: Config.IMAGES_FOLDER,
      },
    };

    this.setState({ addingImage: true });

    ImagePicker.showImagePicker(options, ({
      didCancel, error, path, uri,
    }) => {
      this.setState({ addingImage: false });

      if (!didCancel && !error) {
        const newImage = {
          uri,
          path: Platform.OS === 'android' ? path : { path: uri },
        };

        this.props.onPictureSelected(newImage);
      }
    });
  }

  render() {
    const { style, uri } = this.props;
    const { addingImage } = this.state;

    return (
      <View
        style={[
          styles.wrapper,
          style,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.touchableOpacity}
          onPress={this.onPress}
        >
          {uri ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              resizeMethod="resize"
              source={{ uri }}
            />
          ) : (
            <View style={styles.noPicture}>
              <Icon name="camera-alt" style={styles.icon} />
            </View>
          )}
        </TouchableOpacity>
        <Spinner overlay visible={addingImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 152,
    width: 152,
    overflow: 'hidden',
    borderRadius: 100,
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
  },
  noPicture: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.greenLight,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: colors.green,
    fontSize: 48,
  },
});
