import { NavigationActions, StackActions } from 'react-navigation';

export const resetAction = (routeName = 'App', params = {}) => StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName, params })],
});

class NavigationService {
  navigator = null;

  setTopLevelNavigator(navigatorRef) {
    this.navigator = navigatorRef;
  }

  navigate(routeName, params) {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  back() {
    this.navigator.dispatch(NavigationActions.back());
  }

  reset(routeName, params) {
    this.navigator.dispatch(resetAction(routeName, params));
  }
}

export default new NavigationService();
