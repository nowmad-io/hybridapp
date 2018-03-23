import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, BackHandler, View } from 'react-native';

import Content from '../../dumbs/content';
import Text from '../../dumbs/text';
import LayoutView from '../../dumbs/layoutView';
import Icon from '../../dumbs/icon';
import Button from '../../dumbs/button';
import Label from '../../dumbs/label';
import FormInput from '../../dumbs/formInput';

import styles from './styles';

class AddImage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      image: props.navigation.state.params.image,
      caption: props.navigation.state.params.image.caption || '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onImageEditBack({
      image: {
        ...this.state.image,
        caption: navigation.state.params.image.caption || '',
      },
    });

    return true;
  }

  onSavePress = () => {
    const { navigation } = this.props;

    navigation.goBack();
    navigation.state.params.onImageEditBack({
      image: {
        ...this.state.image,
        caption: this.state.caption,
      },
    });
  }

  onDeletePress = () => {
    const { navigation } = this.props;

    navigation.goBack();
    navigation.state.params.onImageEditBack({
      image: this.state.image,
      remove: true,
    });
  }

  render() {
    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={this.onBackPress} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right">
            <Button transparent onPress={this.onSavePress}>
              <Text>SAVE</Text>
            </Button>
          </LayoutView>
        </LayoutView>
        <Content style={styles.content}>
          <View>
            <Label text="What is happening in this picture ?" required />
            <FormInput
              placeholder="E.g: The water mirror of Bordeaux"
              defaultValue={this.state.caption}
              onChangeText={caption => this.setState({ caption })}
              maxLength={30}
            />
          </View>
          <View
            style={styles.imageWrapper}
          >
            <Image
              style={styles.image}
              resizeMethod="resize"
              source={{ uri: this.state.image.source || this.state.image.uri }}
            />
          </View>
          <View
            style={styles.actionsWrapper}
          >
            <Icon
              style={styles.icon}
              name="delete"
              onPress={this.onDeletePress}
            />
          </View>
        </Content>
      </LayoutView>
    );
  }
}

export default AddImage;
