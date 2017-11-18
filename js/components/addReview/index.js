import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, BackHandler } from 'react-native';
import { CardItem, Container, Header, Content, Left, Body, Right, Button, Icon,
  Text, View, Radio } from 'native-base';
import _ from 'lodash';
import Config from 'react-native-config'
import ImagePicker from 'react-native-image-picker';

import { categoriesList, statusList } from '../../lists';
import Map from '../map';
import Marker from '../marker';
import Tag from '../tag';
import Label from '../label';
import FormInput from '../formInput';
import BasicButton from '../basicButton';
import RadioButtons from '../radioButtons';
import ImageHolder from '../imageHolder';

import { addReview, updateReview } from '../../api/reviews';

import styles from './styles';

const MAX_LENGTH_IMAGES = 5;

class AddReview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    review: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const place = props.navigation.state.params.place;
    const review = props.navigation.state.params.review;
    
    const defaultReview = {
      short_description: '',
      information: '',
      status: statusList[0],
      categories: [],
      images: []
    }

    this.state = {
      place,
      ...defaultReview
    };

    if (review) {
      this.state = {
        place,
        id: review.id,
        short_description: review.short_description || defaultReview.short_description,
        information: review.information || defaultReview.information,
        status: review.status || defaultReview.status,
        categories: review.categories ? review.categories.map(cat => (cat.name)) : defaultReview.categories,
        images: review.pictures || defaultReview.images
      }
    }
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

    return true;
  }

  onRef = (ref) => {
    this._map = ref;
  }

  onMapReady = () => {
    if (this._map) {
      this._map.animateToCoordinate(this.state.place);
    }
  }

  onPublish = () => {
    const review = {
      ...this.state,
      place: {
        latitude: this.state.place.latitude,
        longitude: this.state.place.longitude
      },
      categories: this.state.categories.map((categorie) => ({
        name: categorie
      })),
      pictures: this.state.images.map((image) => ({
        source: image.data,
        caption: image.caption
      }))
    };

    if (this.state.id) {
      this.props.dispatch(updateReview(review));
    } else {
      this.props.dispatch(addReview(review));
    }
  }

  toggleCategorie(categorie) {
    const { categories } = this.state;
    let newCategories = categories;

    const selected = _.indexOf(categories, categorie) !== -1;

    if (selected) {
      newCategories = _.without(newCategories, categorie);
    } else {
      newCategories.push(categorie);
    }

    this.setState({ categories: newCategories });
  }

  selectImages = () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: Config.IMAGES_FOLDER
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.navigateToImage(response);
      }
    });
  }

  navigateToImage(image) {
    this.props.navigation.navigate('AddImage', {
      onImageEditBack: this.onImageEditBack,
      image
    });
  }

  onImageEditBack = ({ image, remove }) => {
    const images = this.state.images;

    if (!image) {
      return;
    }

    if (image && remove) {
      this.setState({ images: _.filter(images, (img) => (img.uri !== image.uri)) });
      return;
    }

    let index = 0;
    const exist = _.some(images, (img, i) => {
      if (img.uri === image.uri) {
        index = i;
        return true;
      }

      return false
    })

    let newImages = [...images];

    if (exist) {
      newImages[index] = image;
    } else {
      newImages.push(image);
    }

    this.setState({ images: newImages });
  }

  render() {
    const { categories, images } = this.state;

    const full = this.state.images && this.state.images.length >= MAX_LENGTH_IMAGES;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Right></Right>
        </Header>
        <Content style={styles.content}>
          <View style={styles.mapWrapper}>
            <Map
              onRef={this.onRef}
              onMapReady={this.onMapReady}
              zoomEnabled={true}
              rotateEnabled={false}
              scrollEnabled={true}
              region={this.props.region}
            >
             <Marker place={this.state.place} />
            </Map>
          </View>
          <View style={styles.reviewWrapper}>
            <Text style={styles.title}>My review</Text>
            <View>
              <Label
                text="Add a short description about this place"
                required={true} />
              <FormInput
                defaultValue={this.state.short_description}
                placeholder="E.g: Beautiful water mirror ! Chill and peaceful..."
                onChangeText={short_description => this.setState({ short_description })}
                maxLength={50} />
            </View>
            <View>
              <Label text="You were..." required={true}/>
              <RadioButtons
                defaultValue={this.state.status}
                list={statusList}
                onSelect={(status) => this.setState({ status })}
              >
              </RadioButtons>
            </View>
            <View>
              <Label text="Was it..." />
              <View style={styles.tagWrapper}>
                {categoriesList.map((categorie, index) => (
                  <Tag
                    key={index}
                    text={categorie}
                    selected={_.indexOf(categories, categorie) !== -1}
                    onPress={() => this.toggleCategorie(categorie)}
                  />
                ))}
              </View>
            </View>
            <View>
              <Label text="Tell your friends about your experience" />
              <FormInput
                defaultValue={this.state.information}
                multiline={true}
                placeholder="What made that experience mad awesome ?"
                onChangeText={information => this.setState({ information })}
                maxLength={300} />
            </View>
            <View>
              <Label text="Add some pictures with a caption" />
              <Label subtitle text="You can add your best 5 pictures !" />
              <View style={styles.imagesWrapper}>
                {(!this.state.images || this.state.images.length < MAX_LENGTH_IMAGES) && (
                  <ImageHolder onPress={this.selectImages} />
                )}
                { this.state.images && this.state.images.map((image, index) => (
                  <ImageHolder
                    key={index}
                    style={styles.image(full, index)}
                    onPress={() => this.navigateToImage(image)}
                    source={image.source || image.uri} />
                )) }
              </View>
              <Text  style={styles.imagesCaption}>
                E.g: A water mirror in Bordeaux !
              </Text>
            </View>
          </View>
        </Content>
        <BasicButton
          text='PUBLISH'
          onPress={this.onPublish} />
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  region: state.home.region
});

export default connect(mapStateToProps, bindActions)(AddReview);
