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
  Input
} from 'native-base';
import { connect } from 'react-redux';
import { selectCollection } from '../../../redux-crud-store';

import { fetchFriends, searchFriends } from '../../api/friends';

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
          <List
            dataArray={this.props.friends}
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
              </ListItem>
            )}
          />
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
                <Button>
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
  friends: state.friends.all,
  search: state.friends.search,
})

export default connect(mapStateToProps, bindActions)(Friends);
