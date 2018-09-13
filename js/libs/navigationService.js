import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;
const resetAction = (routeName = 'App', params = {}) => StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName, params })],
});

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(NavigationActions.back());
}

function reset(routeName, params) {
  _navigator.dispatch(resetAction(routeName, params));
}


export default {
  setTopLevelNavigator,
  navigate,
  back,
  resetAction,
  reset,
};
