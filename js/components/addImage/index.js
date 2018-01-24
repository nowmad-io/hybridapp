import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, BackHandler, View } from 'react-native';
import { Left, Right, Button, Content } from 'native-base';

import Text from '../dumbs/text';
import LayoutView from '../dumbs/layoutView';
import Icon from '../dumbs/icon';

import Label from '../label';
import FormInput from '../formInput';
import ImageHolder from '../imageHolder';

import styles from './styles';

class AddImage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      image: props.navigation.state.params.image,
      caption: props.navigation.state.params.image.caption || ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onImageEditBack({
      image: {
        ...this.state.image,
        caption: navigation.state.params.image.caption || ''
      }
    });

    return true;
  }

  onSavePress = () => {
    const { navigation } = this.props;

    navigation.goBack()
    navigation.state.params.onImageEditBack({
      image: {
        ...this.state.image,
        caption: this.state.caption
      }
    });
  }

  onDeletePress = () => {
    const { navigation } = this.props;

    navigation.goBack()
    navigation.state.params.onImageEditBack({
      image: this.state.image,
      remove: true
    });
  }

  render() {
    return (
      <LayoutView type='container'>
        <LayoutView type='header'>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={this.onSavePress}>
              <Text>SAVE</Text>
            </Button>
          </Right>
        </LayoutView>
        <Content style={styles.content}>
          <View>
            <Label text="What is happening in this picture ?" required={true}/>
            <FormInput
              placeholder="E.g: The water mirror of Bordeaux"
              defaultValue={this.state.caption}
              onChangeText={caption => this.setState({ caption })}
              maxLength={30} />
          </View>
          <View
            style={styles.imageWrapper}>
            <Image
              style={styles.image}
              resizeMethod="resize"
              source={{uri: this.state.image.source || this.state.image.uri}} />
          </View>
          <View
            style={styles.actionsWrapper}>
            <Icon
              style={styles.icon}
              name='delete'
              onPress={this.onDeletePress}/>
          </View>
        </Content>
      </LayoutView>
    );
  }
}

export default AddImage;
