import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, BackHandler, View } from 'react-native';

import Button from '../../dumbs/button';
import Content from '../../dumbs/content';
import LayoutView from '../../dumbs/layoutView';
import Text from '../../dumbs/text';
import Label from '../../dumbs/label';
import FormInput from '../../dumbs/formInput';

import {
  acceptFriendship, sendFriendship, rejectFriendship, cancelFriendship,
} from '../../../actions/friends';
import { fetchPlaces } from '../../../actions/reviews';


import styles from './styles';

class AddFriend extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    me: PropTypes.object,
    incomings: PropTypes.array,
    outgoings: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.navigation.state.params.user,
      email: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack();

    return true;
  }

  onSendRequest() {
    if (this.state.email === this.state.user.email) {
      this.props.dispatch(sendFriendship({
        from_user_id: this.props.me.id,
        to_user_id: this.state.user.id,
      }));
    }
  }

  onAcceptRequest(request) {
    this.props.dispatch(acceptFriendship(request.id));
    this.props.dispatch(fetchPlaces());
    this.props.navigation.goBack();
  }

  onCancelRequest(request) {
    this.props.dispatch(cancelFriendship(request.id));
  }

  onRejectRequest(request) {
    this.props.dispatch(rejectFriendship(request.id));
  }

  render() {
    let request = null;
    const incoming = this.props.incomings.some((req) => {
      if (req.from_user.email === this.state.user.email) {
        request = req;
        return true;
      }
      return false;
    });
    const outgoing = this.props.outgoings.some((req) => {
      if (req.to_user.email === this.state.user.email) {
        request = req;
        return true;
      }
      return false;
    });

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={this.onBackPress} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <Content style={styles.content}>
          <View style={styles.profileWrapper}>
            <View>
              <Image
                resizeMethod="resize"
                style={styles.thumbnail}
                source={{ uri: this.state.user.picture }}
              />
            </View>
            <View>
              <Text style={styles.title}>
                {this.state.user.first_name}
              </Text>
              <Text>
                {this.state.user.last_name}
              </Text>
            </View>
          </View>
          <View>
            <Label text={`To add ${this.state.user.first_name} as a Friend, enter his email address`} required />
            <FormInput
              defaultValue={incoming || outgoing ? this.this.state.user.email : ''}
              onChangeText={email => this.setState({ email })}
              placeholder="Email address"
            />

            {incoming && (
              <View style={styles.buttonWrapper}>
                <Button
                  transparent
                  style={styles.requestButton}
                  onPress={() => this.onRejectRequest(request)}
                >
                  <Text>
                    Reject
                  </Text>
                </Button>
                <Button
                  style={styles.requestButton}
                  onPress={() => this.onAcceptRequest(request)}
                >
                  <Text>
                    Accept request
                  </Text>
                </Button>
              </View>
            )}
            {outgoing && (
              <Button
                style={styles.requestButton}
                onPress={() => this.onCancelRequest(request)}
              >
                <Text>
                  Cancel request
                </Text>
              </Button>
            )}
            {!incoming && !outgoing && (
              <Button
                style={styles.requestButton}
                onPress={() => this.onSendRequest()}
              >
                <Text>
                  Send request
                </Text>
              </Button>
            )}
          </View>
        </Content>
      </LayoutView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  me: state.auth.me,
  incomings: state.friends.incomings,
  outgoings: state.friends.outgoings,
});

export default connect(mapStateToProps, bindActions)(AddFriend);
