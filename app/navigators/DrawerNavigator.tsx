import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../shared';
import ScreenNames from '../utils/ScreenNames';
import BottomNavigator from './customer/BottomNavigator';

const { Navigator, Screen } = createDrawerNavigator();

function CustomDrawerContent() {
  const drawerItems = [
    {
      name: '',
      icon: <></>,
      onPress: () => {},
      isVisible: true,
    },
  ];

  return (
    <View>
      <Button btnName="hello" />
    </View>
  );
}
const DrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Navigator
      initialRouteName={ScreenNames.HOME_NAVIGATOR}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: '100%' },
      }}
      drawerContent={() => <CustomDrawerContent />}
    >
      <Screen
        name={ScreenNames.HOME_NAVIGATOR}
        component={BottomNavigator}
        options={{
          headerShown: true,
          header: () => <></>,
        }}
      />
    </Navigator>
  );
};

export default DrawerNavigator;
