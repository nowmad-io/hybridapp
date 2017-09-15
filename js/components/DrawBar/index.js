import React from 'react';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';

const routes = ['Home', 'BlankPage'];

export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: React.PropTypes.object,
  };

  render() {
    return (
      <Container>
        <Content>
          <List
            style={{
              paddingTop: 18,
            }}
            dataArray={routes}
            renderRow={data => (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
