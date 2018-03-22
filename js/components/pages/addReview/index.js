import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, BackHandler, Keyboard, Animated, PanResponder, View } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';

import Config from 'react-native-config';
import ImagePicker from 'react-native-image-picker';

import Icon from '../../dumbs/icon';
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

import Map from '../../map';
import Marker from '../../dumbs/marker';

import { categoriesList, statusList } from '../../../lists';
import { addReview, updateReview } from '../../../api/reviews';
import { reviewLoading } from '../../../actions/reviews';

import styles from './styles';

const MAX_LENGTH_PICTURES = 5;

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
      pictures: [],
    };

    this.state = {
      place,
      ...defaultReview,
    };

    if (review) {
      this.state = {
        place,
        id: review.id,
        short_description: review.short_description || defaultReview.short_description,
        information: review.information || defaultReview.information,
        status: review.status || defaultReview.status,
        categories: review.categories ? review.categories.map(cat => (cat.name)) : defaultReview.categories,
        pictures: review.pictures || defaultReview.pictures,
      };
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    if (this.props.reviewLoading) {
      this.props.dispatch(reviewLoading(false));
    }
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
    if (this._map) {
      this.refs.map.animateToCoordinate(this.state.place);
    }
  }

  onPublish = () => {
    const review = {
      ...this.state,
      public: this.props.public_default,
      place: {
        latitude: this.state.place.latitude,
        longitude: this.state.place.longitude,
      },
      categories: this.state.categories.map(categorie => ({
        name: categorie,
      })),
      pictures: this.state.pictures.map((image) => {
        const picture = image.id ? { pictureId: image.id } : { source: image.data };

        return {
          ...picture,
          caption: image.caption,
        };
      }),
    };

    Keyboard.dismiss();

    this.props.dispatch(reviewLoading(true));
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

  selectPictures = () => {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: Config.IMAGES_FOLDER,
      },
    };
    this.props.dispatch(reviewLoading(true));

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error) {
        this.props.dispatch(reviewLoading(false));
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

  onImageEditBack = ({ image, remove }) => {
    const pictures = this.state.pictures;

    this.props.dispatch(reviewLoading(false));

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

  render() {
    const { categories, pictures, status } = this.state;

    const full = this.state.pictures && this.state.pictures.length >= MAX_LENGTH_PICTURES;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="arrow-back" />
            </Button>
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <Content style={styles.content}>
          <View style={styles.mapWrapper}>
            <Map
              ref="map"
              onMapReady={this.onMapReady}
              zoomEnabled
              rotateEnabled={false}
              scrollEnabled
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
                required
              />
              <FormInput
                defaultValue={this.state.short_description}
                placeholder="E.g: Beautiful water mirror ! Chill and peaceful..."
                onChangeText={short_description => this.setState({ short_description })}
                maxLength={50}
              />
            </View>
            <View>
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
            <View>
              <Label text="Was it..." />
              <View style={styles.tagWrapper}>
                {categoriesList.map(categorie => (
                  <Tag
                    key={categorie.id}
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
                multiline
                placeholder="What made that experience mad awesome ?"
                onChangeText={information => this.setState({ information })}
                maxLength={300}
              />
            </View>
            <View>
              <Label text="Add some pictures with a caption" />
              <Label subtitle text="You can add your best 5 pictures !" />
              <View style={styles.imagesWrapper}>
                {(!this.state.pictures || this.state.pictures.length < MAX_LENGTH_PICTURES) && (
                  <ImageHolder onPress={this.selectPictures} />
                )}
                { this.state.pictures && this.state.pictures.map((image, index) => (
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
          </View>
        </Content>
        <Button
          wrapped
          onPress={this.onPublish}
        >
          <Text>Publish</Text>
        </Button>

        <Spinner overlay visible={this.props.reviewLoading} />
      </LayoutView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  region: state.home.region,
  reviewLoading: state.home.reviewLoading,
  public_default: state.auth.me.public_default,
});

export default connect(mapStateToProps, bindActions)(AddReview);
