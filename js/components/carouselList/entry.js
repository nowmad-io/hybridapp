import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, Container, Header, Content, Card, CardItem, Thumbnail, Text,
  Button, Icon, Right, Left, Body } from 'native-base';
import { ParallaxImage } from 'react-native-snap-carousel';
import _ from 'lodash';
import shortid from 'shortid';

import { entryStyles } from './styles';

const pictureHolder = require('../../../images/picture_holder.jpg');

class Entry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number,
    selected: PropTypes.bool
  };

  render () {
    let { data: { reviews }, index, selected } = this.props;

    const myReview = _.find(reviews, (review) => {
      return review.user_type === 'me';
    })
    const otherReviews = myReview ? _.filter(reviews, (review) => review.id !== myReview.id) : reviews;

    const orderedReviews = _.concat(_.compact([myReview]), otherReviews);

    const pictures = _.flatten(orderedReviews.map((review) => {
      return review.pictures
    }));

    return (
      <View style={entryStyles.slideInnerContainer(index)}>
        <Card style={entryStyles.card(selected)}>
          <CardItem style={entryStyles.infoWrapper}>
            <Left>
              <Thumbnail style={entryStyles.thumbnail} source={{uri: orderedReviews[0].created_by.picture}} />
              <Body>
                <Text>
                  <Text>
                    {myReview ? 'You' : orderedReviews[0].created_by.first_name }
                  </Text>
                  {orderedReviews.length > 1 ? ` and ${orderedReviews.length - 1} more friend${orderedReviews.length > 2 ? 's' : ''}` : ''}
                </Text>
                <Text note>- { orderedReviews[0].short_description } -</Text>
                <Text style={entryStyles.address}>
                    <Icon style={entryStyles.addressIcon} name="md-pin" />  River Garonne, Bordeaux, France
                </Text>
              </Body>
              {_.without(orderedReviews, orderedReviews[0]).map((review, index) => (
                <Thumbnail
                  xsmall
                  key={shortid.generate()}
                  style={entryStyles.thumbnailFriends(index)}
                  source={{uri: review.created_by.picture}}
                />
              ))}
            </Left>
          </CardItem>
          <CardItem style={entryStyles.picturesWrapper}>
            <Image
              source={pictures.length ? {uri: pictures[0].source} : pictureHolder}
              style={entryStyles.mainPicture(pictures.length)} />
            <View style={entryStyles.wrapperRight}>
              {pictures.length > 1 && (
                <Image source={{uri: pictures[1].source}} style={entryStyles.pictures(pictures.length)}/>
              )}
              {pictures.length > 2 && (
                <Image source={{uri: pictures[2].source}} style={entryStyles.pictures(pictures.length, false)}/>
              )}
            </View>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default Entry
