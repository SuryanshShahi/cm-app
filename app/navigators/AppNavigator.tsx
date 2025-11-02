import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context';
import { localstorageKeys } from '../utils/localstorageKeys';
import { navigationRef } from '../utils/StaticNavigation';
import DrawerNavigator from './DrawerNavigator';
import LoginNavigator from './LoginNavigator';
import Loader from '../shared/Loader';

export const AppNavigator = () => {
  const { data, setData } = useContext(GlobalContext);
  console.log("🚀 ~ AppNavigator ~ data:", data)

  // useEffect(() => {}, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <NavigationContainer ref={navigationRef}>
      {data?.isLoggedIn ? <DrawerNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
