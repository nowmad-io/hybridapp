import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  ListItem,
  View,
  Item,
  Input,
  Separator
} from 'native-base';
import { connect } from 'react-redux';
import { selectCollection } from '../../../redux-crud-store';

import { fetchFriends, searchFriends, sendFriendship } from '../../api/friends';

class Friends extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    friends: PropTypes.array,
  };

  _onSearchInput(text) {
    this.props.dispatch(searchFriends(text));
  }

  _onAdd(friend) {
    this.props.dispatch(sendFriendship({
      from_user_id: this.props.me.id,
      to_user_id: friend.id
    }));
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Friends</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <List>
            <Separator bordered>
              <Text>MY FRIENDS</Text>
            </Separator>
            { this.props.friends.length ? this.props.friends.map(friend => (
              <ListItem
                key={friend.id}
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>{friend.first_name} {friend.last_name}</Text>
                  <Text note>{friend.email}</Text>
                </Body>
              </ListItem>
            )) : (
              <ListItem
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>No friends.. Yet !</Text>
                </Body>
              </ListItem>
            )}
            <Separator bordered>
              <Text>INCOMING REQUESTS</Text>
            </Separator>
            { this.props.incomings.length ? this.props.incomings.map(request => (
              <ListItem
                key={request.id}
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>{request.from_user.first_name} {request.from_user.last_name}</Text>
                  <Text note>{request.from_user.email}</Text>
                </Body>
              </ListItem>
            )) : (
              <ListItem
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>No incoming request</Text>
                </Body>
              </ListItem>
            )}
            <Separator bordered>
              <Text>OUTGOING REQUESTS</Text>
            </Separator>
            { this.props.outgoings.length ? this.props.outgoings.map(request => (
              <ListItem
                key={request.id}
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>{request.to_user.first_name} {request.to_user.last_name}</Text>
                  <Text note>{request.to_user.email}</Text>
                </Body>
              </ListItem>
            )) : (
              <ListItem
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>No outgoing request</Text>
                </Body>
              </ListItem>
            )}
          </List>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => this._onSearchInput(text)}
            />
            <Icon name="ios-people" />
          </Item>
          <List
            dataArray={this.props.search}
            renderRow={data => (
              <ListItem
                style={{
                  marginLeft: 0,
                }}
              >
                <Body>
                  <Text>{data.first_name} {data.last_name}</Text>
                  <Text note>{data.email}</Text>
                </Body>
                <Right>
                <Button
                  onPress={() => this._onAdd(data)}>
                  <Text>Add</Text>
                </Button>
              </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
})

const mapStateToProps = state => ({
  me: state.auth.me,
  friends: state.friends.all,
  incomings: state.friends.incomings,
  outgoings: state.friends.outgoings,
  search: state.friends.search,
})

export default connect(mapStateToProps, bindActions)(Friends);
