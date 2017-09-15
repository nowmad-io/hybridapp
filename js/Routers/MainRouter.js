import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Login from "../components/login/";
import AppRouter from "./AppRouter";

export default (StackNav = StackNavigator({
  Login: { screen: Login },
  App: { screen: AppRouter }
}));
