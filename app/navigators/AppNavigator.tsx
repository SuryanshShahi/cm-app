import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { GlobalContext } from '../context';
import { navigationRef } from '../utils/StaticNavigation';
import DrawerNavigator from './DrawerNavigator';
import LoginNavigator from './LoginNavigator';

export const AppNavigator = () => {
  const { data } = useContext(GlobalContext);

  return (
    <NavigationContainer ref={navigationRef}>
      {data?.isLoggedIn ? <DrawerNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
