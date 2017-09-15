import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { NavigationActions } from 'react-navigation'

import styles from "./styles";

const background = require("../../../images/shadow.png");

class Login extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  navigateToHome() {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "App" })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item>
                  <Icon active name="person" />
                  <Input
                    name="email"
                    value={this.state.email}
                    placeholder="EMAIL"
                    onChangeText={email => this.setState({ email })}
                  />
                  {this.state.error
                    ? <Item style={{ borderColor: "transparent" }}>
                        <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
                        <Text style={{ fontSize: 15, color: "red" }}>{ this.state.error }</Text>
                      </Item>
                    : <Text />}
                </Item>
                <Item>
                  <Icon active name="unlock" />
                  <Input
                    name="password"
                    value={this.state.password}
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                  {this.state.error
                    ? <Item style={{ borderColor: "transparent" }}>
                        <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
                        <Text style={{ fontSize: 15, color: "red" }}>{ this.state.error }</Text>
                      </Item>
                    : <Text />}
                </Item>
                <Button
                  style={styles.btn}
                  onPress={() => this.navigateToHome()}
                >
                  <Text>Login</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

Login.navigationOptions = {
  header: null
};

function bindActions(dispatch) {
  return {};
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(Login);
