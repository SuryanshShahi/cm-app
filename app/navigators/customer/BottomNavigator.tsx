import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import Home from '../../screens/home';
import Button from '../../shared/buttons';
import InputField from '../../shared/buttons/InputField';
import { width } from '../../utils/constants';
import { Feather } from '../../utils/Icons';
import ScreenNames from '../../utils/ScreenNames';
import tw from '../../utils/tailwind';
import Header from '../components/Header';
import { CustomerTabBar } from './TabBar';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomNavigator = () => {
  const { setData, data } = useContext(GlobalContext);
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}
      initialRouteName={ScreenNames.HOME}
      tabBar={props => <CustomerTabBar {...props} />}
    >
      <Screen name={ScreenNames.HOME} component={Home} />
    </Navigator>
  );
};

export default BottomNavigator;
