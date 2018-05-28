import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Icon from '../../dumbs/icon';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import Avatar from '../../dumbs/avatar';

import { runSagas, stopSagas } from '../../../actions/utils';
import { apiLogout } from '../../../api/auth';
import { acceptFriendship, rejectFriendship, cancelFriendship } from '../../../api/friends';

import { colors, font } from '../../../parameters';

class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    me: PropTypes.object,
    all: PropTypes.array,
    incomings: PropTypes.array,
  };

  static initials({ first_name: firstName, last_name: lastName }) {
    if (!firstName && !lastName) {
      return '';
    }

    return `${firstName[0]}${lastName[0]}`;
  }

  componentWillMount() {
    this.props.dispatch(runSagas());
  }

  componentWillUnmount() {
    this.props.dispatch(stopSagas());
  }

  onLogoutPress() {
    this.props.dispatch(apiLogout());
  }

  _onAccept(id) {
    this.props.dispatch(acceptFriendship(id));
  }

  _onReject(id) {
    this.props.dispatch(rejectFriendship(id));
  }

  _onCancel(id) {
    this.props.dispatch(cancelFriendship(id));
  }

  render() {
    const {
      me, all, incomings,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.profileWrapper}>
          <View style={styles.info}>
            <Text style={styles.title}>{me.first_name}</Text>
            <Text style={styles.subtitle}>
              {`${all.length} friend${all.length > 0 ? 's' : ''}`}
            </Text>
          </View>
          <Avatar
            text={DrawBar.initials(me)}
            size={50}
          />
        </View>
        <View style={styles.contentWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.pending}>Pending friend request</Text>
            { incomings.length > 0 && incomings.map(({ from_user: fromUser }) => (
              <Avatar
                text={DrawBar.initials(fromUser)}
                size={50}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Button
            light
            style={styles.addFriendsButton}
            buttonStyle={{ justifyContent: 'flex-start' }}
          >
            <Text
              style={styles.addFriendsLabel}
              uppercase={false}
            >
              Add friends
            </Text>
          </Button>
          <View style={styles.subFooter}>
            <Button
              transparent
              style={styles.footerButton}
              onPress={() => this.onLogoutPress()}
            >
              <Icon name="share" style={styles.footerIcon} />
              <Text
                style={styles.footerLabel}
                uppercase={false}
              >
                Share
              </Text>
            </Button>
            <Button
              transparent
              style={styles.footerButton}
              onPress={() => this.onLogoutPress()}
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
  info: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: font.fontWeight.medium,
    color: colors.grey,
  },
  contentWrapper: {
    paddingTop: 32,
    paddingHorizontal: 20,
    flex: 1,
  },
  footer: {
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: colors.blueDark,
  },
  addFriendsButton: {
    borderWidth: 0,
  },
  addFriendsLabel: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: font.fontWeight.regular,
  },
  subFooter: {
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
  },
  footerLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: font.fontWeight.light,
  },
});
