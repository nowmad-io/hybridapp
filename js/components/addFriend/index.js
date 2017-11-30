import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, BackHandler } from 'react-native';
import { Container, Header, Left, Right, Button, Text, Content, Icon, View } from 'native-base';

import { acceptFriendship, sendFriendship, rejectFriendship, cancelFriendship } from '../../api/friends';
import { reviewsSearchByUser } from '../../api/reviews';

import Label from '../label';
import FormInput from '../formInput';

import styles from './styles';

class AddFriend extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.navigation.state.params.user,
      email: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
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
        to_user_id: this.state.user.id
      }));
    } else {
      console.log('The email does not match the user')
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
          incoming = props.incomings.some(req => {
            if (req.from_user.email === state.user.email) {
              request = req;
              return true;
            }
            return false
          }),
          outgoing = props.outgoings.some(req => {
            if (req.to_user.email === state.user.email) {
              request = req;
              return true;
            }
            return false
          });

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Right></Right>
        </Header>
        <Content style={styles.content}>
          <View style={styles.profileWrapper}>
            <View>
              <Image
                resizeMethod="resize"
                style={styles.thumbnail}
                source={{ uri: state.user.picture }} />
            </View>
            <View>
              <Text style={styles.title}>{state.user.first_name}</Text>
              <Text style={styles.subtitle}>{state.user.last_name}</Text>
            </View>
          </View>
          <View>
            <Label text={`To add ${state.user.first_name} as a Friend, enter his email address`} required={true}/>
            <FormInput
              defaultValue={incoming || outgoing ? this.state.user.email : ''}
              onChangeText={email => this.setState({ email })}
              placeholder="Email address" />

            {incoming && (
              <View style={styles.buttonWrapper}>
                <Button
                  transparent
                  style={styles.requestButton}
                  onPress={() => this.onRejectRequest(request)}>
                  <Text>Reject</Text>
                </Button>
                <Button
                  style={styles.requestButton}
                  onPress={() => this.onAcceptRequest(request)}>
                  <Text>Accept request</Text>
                </Button>
              </View>
            )}
            {outgoing && (
              <Button
                style={styles.requestButton}
                onPress={() => this.onCancelRequest(request)}>
                <Text>Cancel request</Text>
              </Button>
            )}
            {!incoming && !outgoing && (
              <Button
                style={styles.requestButton}
                onPress={() => this.onSendRequest()}>
                <Text>Send request</Text>
              </Button>
            )}
          </View>
        </Content>
      </Container>
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

export default connect(mapStateToProps, bindActions)(AddFriend);
