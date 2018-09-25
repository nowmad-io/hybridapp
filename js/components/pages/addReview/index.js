import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BackHandler, Keyboard, View, Platform,
} from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';
import Config from 'react-native-config';
import ImagePicker from 'react-native-image-picker';

import { publishReviewEvent } from '../../../libs/mixpanel';

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
import Map from '../../dumbs/map';
import Marker from '../../dumbs/marker';

import { addReview, updateReview } from '../../../actions/reviews';
import { selectFullReview, selectCategories } from '../../../reducers/entities';

import styles from './styles';

const MAX_LENGTH_PICTURES = 5;
const STATUS_LIST = [
  'Travelling here',
  'Living here',
  'Local',
];

class AddReview extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    place: PropTypes.object,
    review: PropTypes.object,
    categoriesList: PropTypes.array,
    me: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { place, review: reviewfromProps } = props;
    const review = reviewfromProps || {};

    const defaultReview = {
      created_by: props.me,
      public: props.me.public_default,
      short_description: '',
      information: '',
      status: STATUS_LIST[0],
      categories: [],
      pictures: [],
      links_1: '',
      links_2: '',
    };

    this.state = {
      time: Date.now(),
      addingImage: false,
      review: {
        ...defaultReview,
        ...review,
      },
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
    const { place: { google, reviews, ...newPlace }, review, time } = this.state;

    const action = review.id ? updateReview : addReview;
    const newReview = {
      id: shortid.generate(),
      created_by: this.props.me.id,
      user_type: 'me',
      ...review,
      place: {
        id: shortid.generate(),
        ...newPlace,
        ...(newPlace.id ? { reviews } : {}),
      },
    };

    Keyboard.dismiss();
    const addressComponents = newPlace.address_components
      && newPlace.address_components[
        newPlace.address_components.length - 1
      ].long_name
      || '';

    publishReviewEvent({
      country: addressComponents,
      timeSpent: Math.floor((Date.now() - time) / 1000),
      categories: review.categories,
    });
    this.props.dispatch(action(newReview));
  }

  onImageEditBack = ({ image, remove }) => {
    const { review: { pictures } } = this.state;

    this.setState({ addingImage: false });

    if (!image) {
      return;
    }

    if (image && remove) {
      this.setState(({ review }) => ({
        review: {
          ...review,
          pictures: _.filter(pictures, img => (img.id !== image.id)),
        },
      }));

      return;
    }

    const index = _.findIndex(pictures, img => (img.id === image.id));
    const newPictures = [...pictures];

    if (index > -1) {
      newPictures[index] = image;
    } else {
      newPictures.push(image);
    }

    this.setState(({ review }) => ({
      review: {
        ...review,
        pictures: newPictures,
      },
    }));
  }

  onAddressLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this._map.updatePadding({ bottom: height });
  }

  selectPictures = () => {
    const options = {
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: Config.IMAGES_FOLDER,
      },
    };

    this.setState({ addingImage: true });

    ImagePicker.showImagePicker(options, ({
      didCancel, error, path, uri,
    }) => {
      if (didCancel || error) {
        this.setState({ addingImage: false });
      } else {
        this.navigateToImage({
          uri,
          path: Platform.OS === 'android' ? path : { path: uri },
        });
      }
    });
  }

  toggleCategorie(categorie) {
    const { review: { categories } } = this.state;
    let newCategories = [...categories];

    const selected = _.findIndex(categories, { id: categorie.id });

    if (selected !== -1) {
      newCategories = _.filter(newCategories, ({ id }) => id !== categorie.id);
    } else {
      newCategories.push(categorie);
    }

    this.setState(({ review }) => ({
      review: {
        ...review,
        categories: newCategories,
      },
    }));
  }

  navigateToImage(image) {
    this.props.navigation.navigate('AddImage', {
      onImageEditBack: this.onImageEditBack,
      image,
    });
  }

  render() {
    const { navigation, categoriesList } = this.props;
    const {
      place,
      review: {
        short_description: shortDescription,
        information,
        categories,
        pictures,
        status,
        link_1: link1,
        link_2: link2,
      },
      addingImage,
    } = this.state;

    const full = pictures && pictures.length >= MAX_LENGTH_PICTURES;
    const valid = !!shortDescription;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={() => navigation.goBack()} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right">
            <Button transparent onPress={this.onPublish} disabled={!valid}>
              <Text>
                PUBLISH
              </Text>
            </Button>
          </LayoutView>
        </LayoutView>
        <Content style={styles.content}>
          <View style={styles.mapWrapper}>
            <Map
              ref={(ref) => { this._map = ref; }}
              onMapReady={this.onMapReady}
            >
              <Marker place={place} />
            </Map>
            <View style={styles.addressWrapper} onLayout={this.onAddressLayout}>
              <Icon style={styles.addressIcon} name="location-on" />
              <Text style={styles.addressText}>
                {place.address}
              </Text>
            </View>
          </View>
          <View style={styles.reviewWrapper}>
            <Text style={styles.title}>
              My review
            </Text>
            <View>
              <Label
                text="Add a short description about this place"
                required
              />
              <FormInput
                defaultValue={shortDescription}
                placeholder="E.g: Beautiful water mirror ! Chill and peaceful..."
                onChangeText={
                  short => this.setState(({ review }) => ({
                    review: {
                      ...review,
                      short_description: short,
                    },
                  }))
                }
                maxLength={50}
              />
            </View>
            <View style={styles.group}>
              <Label text="You were..." required />
              {STATUS_LIST.map(stat => (
                <RadioButton
                  key={shortid.generate()}
                  selected={status === stat}
                  text={stat}
                  onPress={() => this.setState(({ review }) => ({
                    review: {
                      ...review,
                      status: stat,
                    },
                  }))}
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
                onChangeText={info => this.setState(({ review }) => ({
                  review: {
                    ...review,
                    information: info,
                  },
                }))}
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
                    uri={image.uri}
                    loading={image.loading}
                  />
                ))}
              </View>
            </View>
            <View style={styles.group}>
              <Label text="Add some links related" />
              <FormInput
                style={styles.linkInput}
                prefixIcon="link"
                defaultValue={link1}
                placeholder="http://..."
                onChangeText={link => this.setState(({ review }) => ({
                  review: {
                    ...review,
                    link_1: link,
                  },
                }))}
              />
              {!!link1 && (
                <FormInput
                  style={styles.linkInput}
                  prefixIcon="link"
                  defaultValue={link2}
                  placeholder="http://..."
                  onChangeText={link => this.setState(({ review }) => ({
                    review: {
                      ...review,
                      link_2: link,
                    },
                  }))}
                />
              )}
            </View>
          </View>
        </Content>
        <Spinner overlay visible={addingImage} />
      </LayoutView>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { place, placeId, reviewId } = props.navigation.state.params;

  return {
    place: place || state.entities.places[placeId] || state.home.gPlace,
    review: selectFullReview(state, reviewId),
    categoriesList: selectCategories(state),
    me: state.auth.me,
  };
};

export default connect(mapStateToProps)(AddReview);
