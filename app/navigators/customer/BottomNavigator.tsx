import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Config from '../../../assets/Config';
import Event from '../../screens/event';
import Home from '../../screens/home';
import Posts from '../../screens/posts';
import { Heading, Img } from '../../shared';
import { SvgLanguage, SvgSearch } from '../../svgs';
import { FontAwesome, Octicons } from '../../utils/Icons';
import ScreenNames from '../../utils/ScreenNames';
import tw from '../../utils/tailwind';
import Header from '../components/Header';
import { CustomerTabBar } from './TabBar';
import Profile from '../../screens/profile';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomNavigator = () => {
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
      <Screen
        name={ScreenNames.POSTS}
        component={Posts}
        options={{
          header: () => (
            <Header
              icon={
                <Octicons name="three-bars" size={24} style={tw`text-white`} />
              }
            >
              <View
                style={tw`flex-row justify-between items-center w-full flex-1 ml-2`}
              >
                <Img source={Config.logoWithoutBg} className="h-6 w-6" />
                <Heading size="2xl" color="white" type="medium">
                  CM 360
                </Heading>
                <View style={tw`flex-row gap-x-3 items-center`}>
                  <SvgSearch stroke="white" />
                  <SvgLanguage fill="white" />
                  <FontAwesome name="bell-o" style={tw`text-white`} size={20} />
                </View>
              </View>
            </Header>
          ),
          headerShown: true,
        }}
      />
      <Screen
        name={ScreenNames.EVENT}
        component={Event}
        options={{
          header: () => (
            <Header
              icon={
                <Octicons name="three-bars" size={24} style={tw`text-white`} />
              }
            >
              <View
                style={tw`flex-row justify-between items-center w-full flex-1 ml-2`}
              >
                <Img source={Config.logoWithoutBg} className="h-6 w-6" />
                <Heading size="2xl" color="white" type="medium">
                  CM 360
                </Heading>
                <View style={tw`flex-row gap-x-3 items-center`}>
                  <SvgSearch stroke="white" />
                  <SvgLanguage fill="white" />
                  <FontAwesome name="bell-o" style={tw`text-white`} size={20} />
                </View>
              </View>
            </Header>
          ),
          headerShown: true,
        }}
      />
      <Screen
        name={ScreenNames.USER_PROFILE}
        component={Profile}
        options={{
          header: () => (
            <Header
              icon={
                <Octicons name="three-bars" size={24} style={tw`text-white`} />
              }
            >
              <View
                style={tw`flex-row justify-between items-center w-full flex-1 ml-2`}
              >
                <Img source={Config.logoWithoutBg} className="h-6 w-6" />
                <Heading size="2xl" color="white" type="medium">
                  CM 360
                </Heading>
                <View style={tw`flex-row gap-x-3 items-center`}>
                  <SvgSearch stroke="white" />
                  <SvgLanguage fill="white" />
                  <FontAwesome name="bell-o" style={tw`text-white`} size={20} />
                </View>
              </View>
            </Header>
          ),
          headerShown: true,
        }}
      />
    </Navigator>
  );
};

export default BottomNavigator;
