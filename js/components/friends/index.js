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
  ListItem
} from 'native-base';
import { select } from 'redux-crud-store';
import { connect } from 'react-redux';

import { fetchFriends } from '../../api/friends';

class Friends extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigation: PropTypes.object,
    friends: PropTypes.object,
  };

  componentWillMount() {
    this._getFriends(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._getFriends(nextProps);
  }

  _getFriends(props) {
    const { friends } = props;

    if (friends.needsFetch) {
      this.props.dispatch(friends.fetch);
    }
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
        </Content>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
})

const mapStateToProps = state => ({
  friends: select(fetchFriends(state, { page: 1 }), state.models),
})

export default connect(mapStateToProps, bindActions)(Friends);
