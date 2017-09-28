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
import { selectCollection } from 'redux-crud-store';

import { fetchFriends, searchFriends } from '../../api/friends';

class Friends extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchResult: []
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    friends: PropTypes.object,
  };
  //
  // componentWillMount() {
  //   this._getFriends(this.props);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   this._getFriends(nextProps);
  // }
  //
  // _getFriends(props) {
  //   const { friends } = props;
  //
  //   if (friends.needsFetch) {
  //     this.props.dispatch(friends.fetch);
  //   }
  // }

  _onSearchInput(text) {
    this.props.search(text)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response', responseJson);
        this.setState({ searchResult: responseJson });
      })
      .catch((error) => { console.error(error); });
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
            dataArray={this.props.friends.data}
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
            dataArray={this.state.searchResult}
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
  friends: selectCollection('friends', state.models),
  search: (email) => searchFriends(state, email),
})

export default connect(mapStateToProps, bindActions)(Friends);
