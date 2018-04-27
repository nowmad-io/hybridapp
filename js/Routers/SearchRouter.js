import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Tab from '../components/pages/home/tab';
import Text from '../components/dumbs/text';

import { colors, font } from '../parameters';

export default TabNavigator({
  All: Tab,
  People: Tab,
  Reviews: Tab,
  Places: Tab,
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarLabel: (tab) => {
      const { routeName } = navigation.state;

      return (
        <Text
          style={[
            styles.regular,
            tab.focused && styles.focused,
          ]}
        >
          { routeName }
        </Text>
      );
    },
  }),
  tabBarOptions: {
    style: {
      elevation: 0,
      backgroundColor: 'transparent',
      borderBottomWidth: 0.5,
      borderColor: colors.grey,
    },
    indicatorStyle: {
      backgroundColor: colors.green,
    },
  },
});

const styles = StyleSheet.create({
  regular: {
    fontSize: 14,
    fontWeight: font.fontWeight.medium,
    color: colors.disabled,
  },
  focused: {
    color: colors.black,
  },
});
