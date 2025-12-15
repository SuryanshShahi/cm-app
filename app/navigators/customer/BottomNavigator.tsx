import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Config from '../../../assets/Config';
import Analytics from '../../screens/analytics';
import Event from '../../screens/event';
import Home from '../../screens/home';
import Posts from '../../screens/posts';
import Profile from '../../screens/profile';
import { Heading, Img } from '../../shared';
import { FontAwesome, Octicons } from '../../utils/Icons';
import ScreenNames from '../../utils/ScreenNames';
import tw from '../../utils/tailwind';
import Header from '../components/Header';
import { CustomerTabBar } from './TabBar';

const { Navigator, Screen } = createBottomTabNavigator();

export const HeaderComponent = ({
  hideBars,
  title,
}: {
  hideBars?: boolean;
  title?: string;
}) => {
  const navigation = useNavigation<any>();
  return (
    <Header
      customNavigation={hideBars ? null : () => navigation.openDrawer()}
      icon={
        !hideBars && (
          <Octicons name="three-bars" size={24} style={tw`text-white`} />
        )
      }
    >
      <View
        style={tw`flex-row justify-between items-center w-full flex-1 ml-2`}
      >
        <Img source={Config.logoWithoutBg} className="h-6 w-6" />
        <Heading size="2xl" color="white" type="medium">
          {title || 'CM 360'}
        </Heading>
        <View style={tw`flex-row gap-x-3 items-center`}>
          {/* <SvgSearch stroke="white" />
          <SvgLanguage fill="white" /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.NOTIFICATION)}
          >
            <FontAwesome name="bell-o" style={tw`text-white`} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </Header>
  );
};
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
      <Screen
        name={ScreenNames.HOME}
        component={Home}
        options={{
          header: () => <HeaderComponent />,
          headerShown: true,
        }}
      />
      <Screen
        name={ScreenNames.POSTS}
        component={Posts}
        options={{
          header: () => <HeaderComponent />,
          headerShown: true,
        }}
      />
      <Screen
        name={ScreenNames.EVENT}
        component={Event}
        options={{
          header: () => <HeaderComponent />,
          headerShown: true,
        }}
      />
      <Screen
        name={ScreenNames.ANALYTICS}
        component={Analytics}
        options={{
          header: () => <HeaderComponent />,
          headerShown: true,
        }}
      />
      <Screen
        name={ScreenNames.USER_PROFILE}
        component={Profile}
        options={{
          header: () => <HeaderComponent />,
          headerShown: true,
        }}
      />
    </Navigator>
  );
};

export default BottomNavigator;
