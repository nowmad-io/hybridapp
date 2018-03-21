import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, BackHandler, View } from 'react-native';

import Icon from '../../dumbs/icon';
import Button from '../../dumbs/button';
import Content from '../../dumbs/content';
import LayoutView from '../../dumbs/layoutView';
import Text from '../../dumbs/text';
import Label from '../../dumbs/label';
import FormInput from '../../dumbs/formInput';

import { acceptFriendship, sendFriendship, rejectFriendship, cancelFriendship } from '../../../api/friends';
import { reviewsSearchByUser } from '../../../api/reviews';


import styles from './styles';

class AddFriend extends Component {
  static propTypes = {
    navigation: PropTypes.object,
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
    const { navigation } = this.props;
    navigation.goBack();

    return true;
  }

  onSendRequest() {
    if (this.state.email === this.state.user.email) {
      this.props.dispatch(sendFriendship({
        from_user_id: this.props.me.id,
        to_user_id: this.state.user.id,
      }));
    } else {
      console.log('The email does not match the user');
    }
  }

  onAcceptRequest(request) {
    this.props.dispatch(acceptFriendship(request.id));
    this.props.dispatch(reviewsSearchByUser(this.state.user.email));
    navigation.goBack();
  }

  onCancelRequest(request) {
    this.props.dispatch(cancelFriendship(request.id));
  }

  onRejectRequest(request) {
    this.props.dispatch(rejectFriendship(request.id));
  }

  render() {
    let request = null;
    const { props, state } = this,
      incoming = props.incomings.some((req) => {
        if (req.from_user.email === state.user.email) {
          request = req;
          return true;
        }
        return false;
      }),
      outgoing = props.outgoings.some((req) => {
        if (req.to_user.email === state.user.email) {
          request = req;
          return true;
        }
        return false;
      });

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={this.onBackPress}>
              <Icon style={styles.icon} name="arrow-back" />
            </Button>
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <Content style={styles.content}>
          <View style={styles.profileWrapper}>
            <View>
              <Image
                resizeMethod="resize"
                style={styles.thumbnail}
                source={{ uri: state.user.picture }}
              />
            </View>
            <View>
              <Text style={styles.title}>{state.user.first_name}</Text>
              <Text>{state.user.last_name}</Text>
            </View>
          </View>
          <View>
            <Label text={`To add ${state.user.first_name} as a Friend, enter his email address`} required />
            <FormInput
              defaultValue={incoming || outgoing ? this.state.user.email : ''}
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
                  <Text>Reject</Text>
                </Button>
                <Button
                  style={styles.requestButton}
                  onPress={() => this.onAcceptRequest(request)}
                >
                  <Text>Accept request</Text>
                </Button>
              </View>
            )}
            {outgoing && (
              <Button
                style={styles.requestButton}
                onPress={() => this.onCancelRequest(request)}
              >
                <Text>Cancel request</Text>
              </Button>
            )}
            {!incoming && !outgoing && (
              <Button
                style={styles.requestButton}
                onPress={() => this.onSendRequest()}
              >
                <Text>Send request</Text>
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
