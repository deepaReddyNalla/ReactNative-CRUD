/* eslint-disable prettier/prettier */
import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: unknown) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
};
export const goBack = () => {
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const resetAndNavigate = (routeName: string, screenParams?: unknown) => {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: routeName as never,
      params: screenParams as never,
    }),
  );
};

export const previousRouteName = (navigation: any) => {
  const navRoutes = navigation.dangerouslyGetParent().state.routes;
  if (navRoutes.length >= 2) {
    return navRoutes[navRoutes.length - 2].routeName;
  }
  return navigation.state.routeName;
};
