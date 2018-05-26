import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';

import Text from '../text';
import Avatar from '../avatar';

import { font, colors } from '../../../parameters';

export default class Review extends PureComponent {
  static propTypes = {
    review: PropTypes.object,
    others: PropTypes.array,
    onPress: PropTypes.func,
  }

  static initials({ first_name: firstName, last_name: lastName }) {
    return firstName[0] + lastName[0];
  }

  render() {
    const {
      onPress,
      review: {
        short_description: shortDescription,
        user_type: userType,
        created_by: createdBy,
        categories,
        pictures,
        status,
      },
      others,
    } = this.props;

    const userText = userType === 'me' ? 'Me' : `${createdBy.first_name} ${createdBy.last_name[0]}`;
    const othersText = others && others.length ? ` and ${others.length} more friend${others.length > 2 ? 's' : ''}` : '';

    return (
      <View style={styles.review}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={onPress ? 0.2 : 1}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <Avatar text={Review.initials(createdBy)} />
            <View style={styles.header_right}>
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
                <Text lowercase>was {status}</Text>
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
              <View style={styles.body_right}>
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
  },
  body_wrapper: {
    flexDirection: 'row',
    height: '100%',
  },
  picture: {
    flex: 1,
    paddingRight: 12,
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
