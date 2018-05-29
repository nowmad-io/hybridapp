import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';

import Text from '../text';
import Avatar from '../avatar';

import { font, colors } from '../../../parameters';

export default class Review extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    review: PropTypes.object,
    others: PropTypes.array,
    onPress: PropTypes.func,
    cover: PropTypes.bool,
    google: PropTypes.bool,
  }

  static initials({ first_name: firstName, last_name: lastName }) {
    return (firstName && lastName) ? firstName[0] + lastName[0] : '';
  }

  constructor(props) {
    super(props);

    this.state = {
      xHeaderRight: 0,
    };
  }

  _onLayout = ({ nativeEvent: { layout: { x } } }) => {
    this.setState({ xHeaderRight: x });
  }

  render() {
    const { xHeaderRight } = this.state;
    const {
      style,
      onPress,
      review: {
        short_description: shortDescription,
        user_type: userType,
        created_by: createdBy,
        categories,
        pictures,
        status,
      },
      google,
      others,
      cover,
    } = this.props;

    const userText = userType === 'me' ? 'Me' : `${createdBy.first_name} ${!google ? createdBy.last_name[0] : ''}`;
    const othersText = others && others.length ? ` and ${others.length} more friend${others.length > 2 ? 's' : ''}` : '';

    return (
      <View style={[
          styles.review,
          style && style,
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={onPress ? 0.8 : 1}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <Avatar
              text={Review.initials(createdBy)}
              icon={google ? 'google' : ''}
              set="FontAwesome"
              textStyle={[
                google && { color: colors.greyDark },
              ]}
            />
            <View
              style={styles.header_right}
              onLayout={this._onLayout}
            >
              <Text>
                <Text style={styles.user_text}>{userText}</Text>
                {othersText}
              </Text>
              {(others && others.length) ? (
                <View style={styles.others}>
                  { others.map(user => (
                    <Avatar
                      key={user.id}
                      style={styles.others_avatar}
                      textStyle={styles.others_avatar_text}
                      text={Review.initials(user)}
                      size={18}
                    />
                  )) }
                </View>
              ) : (
                <Text lowercase={!google}>{google ? 'Google' : `was ${status}`}</Text>
              )}
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.body_wrapper}>
              { (pictures && pictures.length > 0) && (
                <Image
                  resizeMode="cover"
                  resizeMethode="resize"
                  source={{ uri: pictures[0].source }}
                  style={styles.picture}
                />
              )}
              { (google && pictures.length > 1) && (
                <Image
                  resizeMode="cover"
                  resizeMethode="resize"
                  source={{ uri: pictures[1].source }}
                  style={[
                    styles.picture,
                    { marginRight: 0 },
                  ]}
                />
              )}
              { !google && (
                <View
                  style={[
                    styles.body_right,
                    cover && (!pictures || !pictures.length) && {
                      left: xHeaderRight - 14,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.description,
                      (!pictures || !pictures.length) && styles.description_noimage,
                    ]}
                  >
                    {shortDescription}
                  </Text>
                  <View style={styles.categories}>
                    {categories.map(({ id, name }, index) => (
                      <Text key={id} style={styles.categorie}>
                        {`${name}${(index !== categories.length - 1) ? ' · ' : ''}`}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  review: {
    paddingTop: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    flex: 1,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  header_right: {
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  user_text: {
    fontWeight: font.fontWeight.medium,
  },
  others: {
    flexDirection: 'row',
  },
  others_avatar: {
    marginRight: 2,
    borderWidth: 1,
  },
  others_avatar_text: {
    fontSize: 9,
    lineHeight: 11,
  },
  body: {
    flex: 1,
    maxHeight: 84,
  },
  body_wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  picture: {
    flex: 1,
    marginRight: 12,
  },
  body_right: {
    paddingLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: font.fontWeight.medium,
  },
  description_noimage: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: font.fontWeight.regular,
  },
  categories: {
    flexDirection: 'row',
  },
  categorie: {
    color: colors.greenShadowDark,
    fontSize: 14,
    lineHeight: 16,
  },
});
