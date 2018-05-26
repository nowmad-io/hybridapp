import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler, Keyboard, View } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';

import Config from 'react-native-config';
import ImagePicker from 'react-native-image-picker';

import LayoutView from '../../dumbs/layoutView';
import Content from '../../dumbs/content';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import Spinner from '../../dumbs/spinner';
import RadioButton from '../../dumbs/radioButton';
import Tag from '../../dumbs/tag';
import Label from '../../dumbs/label';
import FormInput from '../../dumbs/formInput';
import ImageHolder from '../../dumbs/imageHolder';
import Icon from '../../dumbs/icon';

import Map from '../../map';
import Marker from '../../dumbs/marker';

import { statusList } from '../../../lists';
import { addReview, updateReview } from '../../../api/reviews';

import styles from './styles';

const MAX_LENGTH_PICTURES = 5;

class AddReview extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    categoriesList: PropTypes.array,
    addingReview: PropTypes.bool,
    me: PropTypes.object,
    region: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { place, review: reviewfromProps } = props.navigation.state.params;
    const review = reviewfromProps || {};

    const defaultReview = {
      created_by: props.me,
      public: props.me.public_default,
      short_description: '',
      information: '',
      status: statusList[0],
      categories: [],
      pictures: [],
      links_1: '',
      links_2: '',
    };

    this.state = {
      addingImage: false,
      ...defaultReview,
      ...review,
      place,
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

    return true;
  }

  onMapReady = () => {
    this._map.animateToCoordinate({
      longitude: this.state.place.longitude,
      latitude: this.state.place.latitude,
    });
  }

  onPublish = () => {
    const action = this.state.id ? updateReview : addReview;
    const review = {
      id: shortid.generate(),
      created_by: this.props.me.id,
      ...this.state,
      pictures: this.state.pictures.map((image) => {
        const picture = image.id ? { pictureId: image.id } : { source: image.data };

        return {
          ...picture,
          caption: image.caption,
        };
      }),
    };
    Keyboard.dismiss();
    this.props.dispatch(action(review));
  }

  onImageEditBack = ({ image, remove }) => {
    const { pictures } = this.state;

    this.setState({ addingImage: false });

    if (!image) {
      return;
    }

    if (image && remove) {
      this.setState({ pictures: _.filter(pictures, img => (img.uri !== image.uri)) });
      return;
    }

    let index = 0;
    const exist = _.some(pictures, (img, i) => {
      if (img.uri === image.uri) {
        index = i;
        return true;
      }

      return false;
    });

    const newPictures = [...pictures];

    if (exist) {
      newPictures[index] = image;
    } else {
      newPictures.push(image);
    }

    this.setState({ pictures: newPictures });
  }

  onAddressLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this._map.updatePadding({ bottom: height });
  }

  toggleCategorie(categorie) {
    const { categories } = this.state;
    let newCategories = [...categories];

    const selected = _.findIndex(categories, { id: categorie.id });

    if (selected !== -1) {
      newCategories = _.filter(newCategories, ({ id }) => id !== categorie.id);
    } else {
      newCategories.push(categorie);
    }

    this.setState({ categories: newCategories });
  }

  selectPictures = () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: Config.IMAGES_FOLDER,
      },
    };

    this.setState({ addingImage: true });

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error) {
        this.setState({ addingImage: false });
      } else {
        this.navigateToImage(response);
      }
    });
  }

  navigateToImage(image) {
    this.props.navigation.navigate('AddImage', {
      onImageEditBack: this.onImageEditBack,
      image,
    });
  }

  render() {
    const {
      addingReview, navigation, region, categoriesList,
    } = this.props;
    const {
      short_description: shortDescription, information, place, categories,
      pictures, status, link_1: link1, link_2: link2, addingImage,
    } = this.state;

    const full = pictures && pictures.length >= MAX_LENGTH_PICTURES;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={() => navigation.goBack()} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right">
            <Button transparent onPress={this.onPublish}>
              <Text>PUBLISH</Text>
            </Button>
          </LayoutView>
        </LayoutView>
        <Content style={styles.content}>
          <View style={styles.mapWrapper}>
            <Map
              ref={(ref) => { this._map = ref; }}
              onMapReady={this.onMapReady}
              region={region}
            >
              <Marker place={{ ...place, reviews: place.reviews.map(review => review.id) }} />
            </Map>
            <View style={styles.addressWrapper} onLayout={this.onAddressLayout}>
              <Icon style={styles.addressIcon} name="location-on" />
              <Text style={styles.addressText}>{place.address}</Text>
            </View>
          </View>
          <View style={styles.reviewWrapper}>
            <Text style={styles.title}>My review</Text>
            <View>
              <Label
                text="Add a short description about this place"
                required
              />
              <FormInput
                defaultValue={shortDescription}
                placeholder="E.g: Beautiful water mirror ! Chill and peaceful..."
                onChangeText={
                  short => this.setState({ short_description: short })
                }
                maxLength={50}
              />
            </View>
            <View style={styles.group}>
              <Label text="You were..." required />
              {statusList.map(stat => (
                <RadioButton
                  key={shortid.generate()}
                  selected={status === stat}
                  text={stat}
                  onPress={() => this.setState({ status: stat })}
                />
              ))}
            </View>
            <View style={styles.group}>
              <Label text="Was it..." />
              <View style={styles.tagWrapper}>
                {categoriesList.map(categorie => (
                  <Tag
                    key={shortid.generate()}
                    text={categorie.name}
                    selected={_.findIndex(categories, { id: categorie.id }) !== -1}
                    onPress={() => this.toggleCategorie(categorie)}
                  />
                ))}
              </View>
            </View>
            <View style={styles.group}>
              <Label text="Tell your friends about your experience" />
              <FormInput
                defaultValue={information}
                multiline
                placeholder="What made that experience mad awesome ?"
                onChangeText={info => this.setState({ information: info })}
                maxLength={300}
              />
            </View>
            <View style={styles.group}>
              <Label text="Add some pictures with a caption" />
              <Label subtitle text="You can add your best 5 pictures !" />
              <View style={styles.imagesWrapper}>
                {(!pictures || pictures.length < MAX_LENGTH_PICTURES) && (
                  <ImageHolder onPress={this.selectPictures} />
                )}
                { pictures && pictures.map((image, index) => (
                  <ImageHolder
                    key={shortid.generate()}
                    style={styles.image(full, index)}
                    onPress={() => this.navigateToImage(image)}
                    source={image.source || image.uri}
                  />
                )) }
              </View>
              <Text style={styles.imagesCaption}>
                E.g: A water mirror in Bordeaux !
              </Text>
            </View>
            <View style={styles.group}>
              <Label text="Add some links related" />
              <FormInput
                style={styles.linkInput}
                icon="link"
                defaultValue={link1}
                placeholder="http://..."
                onChangeText={link => this.setState({ link_1: link })}
              />
              {!!link1 && (
                <FormInput
                  style={styles.linkInput}
                  icon="link"
                  defaultValue={link2}
                  placeholder="http://..."
                  onChangeText={link => this.setState({ link_2: link })}
                />
              )}
            </View>
          </View>
        </Content>
        <Spinner overlay visible={addingReview || addingImage} />
      </LayoutView>
    );
  }
}

const mapStateToProps = state => ({
  region: state.home.region,
  categoriesList: _.map(state.entities.categories, categorie => categorie),
  addingReview: state.home.addingReview,
  me: state.auth.me,
});

export default connect(mapStateToProps)(AddReview);
