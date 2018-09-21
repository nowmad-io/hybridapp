import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, ScrollView, Share, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { inviteFriendsEvent } from '../../../libs/mixpanel';

import Icon from '../../dumbs/icon';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import Avatar from '../../dumbs/avatar';
import Spinner from '../../dumbs/spinner';

import { runSagas, stopSagas } from '../../../actions/utils';
import { apiLogout } from '../../../actions/auth';
import { acceptFriendship, rejectFriendship } from '../../../actions/friends';

import { colors, font } from '../../../parameters';

class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static initials({ first_name: firstName, last_name: lastName }) {
    if (!firstName && !lastName) {
      return '';
    }
    return `${firstName[0]}${lastName[0]}`;
  }

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    me: PropTypes.object,
    all: PropTypes.array,
    incomings: PropTypes.array,
  };

  componentWillMount() {
    this.props.dispatch(runSagas());
  }

  componentWillUnmount() {
    this.props.dispatch(stopSagas());
  }

  onSharePress = () => {
    Share.share({
      message: `Hi!
Join me in Nowmad and lets start sharing the best places for travelling around the world !
See you soon on Nowmad !
https://play.google.com/store/apps/details?id=com.nowmad`,
    });
    inviteFriendsEvent({ sharedFrom: 'Side bar' });
  }

  onLogoutPress = () => {
    this.props.dispatch(apiLogout());
    this.props.navigation.navigate('Login');
  }

  onAcceptPress = id => () => {
    this.props.dispatch(acceptFriendship(id));
  }

  onRejectPress = id => () => {
    this.props.dispatch(rejectFriendship(id));
  }

  onEditPicture = () => {
    this.props.navigation.navigate('EditProfile');
  }

  render() {
    const {
      me, all, incomings,
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.profileWrapper}
          onPress={this.onEditPicture}
        >
          <View style={styles.info}>
            <Text style={styles.title}>
              {me.first_name}
            </Text>
            <Text style={styles.subtitle}>
              {`${all.length} friend${all.length === 1 ? '' : 's'}`}
            </Text>
          </View>
          <View style={styles.avatarWrapper}>
            <Avatar
              uri={me.picture}
              text={DrawBar.initials(me)}
              size={50}
            />
            <View style={styles.editProfile}>
              <Icon
                style={styles.editProfileIcon}
                name="camera-alt"
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.contentWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.pending}>
              Pending friend request
            </Text>
            { incomings.length > 0 ? incomings.map(({ id, from_user: fromUser, loading }) => (
              <View
                key={fromUser.id}
                style={styles.request}
              >
                <Avatar
                  uri={fromUser.picture}
                  text={DrawBar.initials(fromUser)}
                  size={40}
                />
                <View style={styles.avatarInfo}>
                  <Text>
                    {`${fromUser.first_name} ${fromUser.last_name}`}
                  </Text>
                </View>
                <Spinner wrapperStyle={styles.spinnerWrapper} visible={loading}>
                  <Button
                    transparent
                    icon="close"
                    style={styles.requestButton}
                    iconStyle={styles.requestIcon}
                    onPress={this.onRejectPress(id)}
                  />
                  <Button
                    transparent
                    icon="check"
                    style={styles.requestButton}
                    iconStyle={styles.requestIcon}
                    onPress={this.onAcceptPress(id)}
                  />
                </Spinner>
              </View>
            )) : (
              <Text style={styles.noRequest}>
                No friend request
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.shareWrapper}>
          <Button
            transparent
            onPress={this.onSharePress}
          >
            <Text style={styles.shareText} transparent uppercase={false}>
              Invite friends to Nowmad
            </Text>
          </Button>
        </View>
        <View style={styles.footer}>
          <Button
            transparent
            style={styles.footerButton}
            onPress={this.onLogoutPress}
          >
            <Icon name="exit-to-app" style={styles.footerIcon} />
            <Text
              style={styles.footerLabel}
              uppercase={false}
            >
              Logout
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.me,
  all: state.friends.all,
  incomings: state.friends.incomings,
});

export default connect(mapStateToProps, null)(DrawBar);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileWrapper: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.grey,
    borderBottomWidth: 0.5,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfile: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: -4,
    left: -4,
    borderWidth: 0,
    elevation: 0,
    height: 25,
    width: 25,
    paddingHorizontal: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPicture: {
    backgroundColor: colors.green,
  },
  editProfileIcon: {
    fontSize: 15,
    color: colors.green,
  },
  noPictureIcon: {
    color: colors.white,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    lineHeight: 26,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: font.fontWeight.medium,
    color: colors.grey,
  },
  pending: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: font.fontWeight.medium,
    marginBottom: 20,
  },
  spinnerWrapper: {
    flexDirection: 'row',
  },
  noRequest: {
    color: colors.grey,
  },
  contentWrapper: {
    paddingTop: 32,
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
  },
  request: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 24,
  },
  avatarInfo: {
    marginLeft: 12,
    flex: 1,
  },
  requestButton: {
    height: 20,
    width: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 50,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestIcon: {
    color: colors.green,
    fontSize: 14,
  },
  addFriendsButton: {
    borderWidth: 0,
  },
  addFriendsLabel: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: font.fontWeight.regular,
  },
  shareWrapper: {
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: colors.grey,
  },
  shareText: {
    color: colors.green,
    fontWeight: font.fontWeight.regular,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.green,
    paddingRight: 4,
    paddingLeft: 20,
  },
  footerButton: {
    alignSelf: 'flex-end',
  },
  footerIcon: {
    marginRight: 8,
    fontSize: 26,
  },
  footerLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: font.fontWeight.light,
  },
});
