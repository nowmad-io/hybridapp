import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Icon from '../../dumbs/icon';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import List from '../../dumbs/list';
import ListItem from '../../dumbs/listItem';
import LayoutView from '../../dumbs/layoutView';

import { runSagas, stopSagas } from '../../../actions/utils';
import { logoutRequest } from '../../../actions/auth';
import { acceptFriendship, rejectFriendship, cancelFriendship } from '../../../api/friends';

import styles from './styles';

class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  componentWillMount() {
    this.props.dispatch(runSagas());
  }

  componentWillUnmount() {
    this.props.dispatch(stopSagas());
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

  onLogoutPress() {
    this.props.dispatch(logoutRequest());

    this.props.navigation.navigate({ routeName: 'Login' });
  }

  render() {
    const { props } = this;

    return (
      <View style={styles.container}>
        <View style={styles.profileWrapper}>
          <View style={styles.info}>
            <Text style={styles.title}>{props.me && props.me.first_name}</Text>
            <Text style={styles.subtitle}>See and edit profile</Text>
          </View>
          <View>
            <Image
              resizeMethod="resize"
              style={styles.thumbnail}
              source={{ uri: props.me && props.me.picture }} />
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <ScrollView>
            <List>
              <Text style={styles.label}>PENDING SENT INVITATIONS</Text>
              <View style={styles.listItemWrapper}>
                { props.outgoings.length ? props.outgoings.map((request, index) => (
                  <ListItem
                    style={styles.listItem(props.outgoings.length - 1 === index)}
                    key={request.id}
                  >
                    <LayoutView type='left'>
                      <Image resizeMethod="resize" source={{uri: request.to_user.picture}} style={styles.userPicture} />
                      <Text>{request.to_user.first_name}</Text>
                    </LayoutView>
                    <LayoutView type='right' style={styles.right}>
                      <TouchableOpacity
                        onPress={() => this._onCancel(request.id)}>
                        <Text style={styles.actionLabel}>Cancel</Text>
                      </TouchableOpacity>
                    </LayoutView>
                  </ListItem>
                )) : (
                  <ListItem
                    style={styles.listItem(true)}
                  >
                    <Text style={styles.empty}>No outgoing request</Text>
                  </ListItem>
                )}
              </View>
              <Text style={styles.label}>PENDING FRIENDS REQUESTS</Text>
              <View style={styles.listItemWrapper}>
                { props.incomings.length ? props.incomings.map((request, index) => (
                  <ListItem
                    style={styles.listItem(props.incomings.length - 1 === index)}
                    key={request.id}
                  >
                    <LayoutView type='left'>
                      <Image resizeMethod="resize" source={{uri: request.from_user.picture}} style={styles.userPicture} />
                      <Text style={styles.itemText}>{request.from_user.first_name}</Text>
                    </LayoutView>
                    <LayoutView type='right' style={styles.right}>
                      <TouchableOpacity
                        onPress={() => this._onReject(request.id)}>
                        <Text style={styles.actionLabel}>Reject</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => this._onAccept(request.id)}>
                        <Text style={styles.acceptLabel}>Accept</Text>
                      </TouchableOpacity>
                    </LayoutView>
                  </ListItem>
                )) : (
                  <ListItem style={styles.listItem(true)}>
                    <Text style={styles.empty}>No incoming request</Text>
                  </ListItem>
                )}
              </View>
            </List>
          </ScrollView>
        </View>
        <View style={styles.actionsWrapper}>
          <Button
            transparent
            style={styles.logoutButton}
            onPress={() => this.onLogoutPress()}
          >
            <Icon name='exit-to-app' style={styles.actionIcon} />
            <Text style={styles.actionLabel}>Logout</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  me: state.auth.me,
  incomings: state.friends.incomings,
  outgoings: state.friends.outgoings,
})

export default connect(mapStateToProps, bindActions)(DrawBar);
