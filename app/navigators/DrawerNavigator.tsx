import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from '../../assets/Config';
import EventDetails from '../screens/event/eventDetails';
import { Button, Divider, Heading, Img } from '../shared';
import { SvgDashboard } from '../svgs';
import { FontAwesome5, Ionicons } from '../utils/Icons';
import ScreenNames from '../utils/ScreenNames';
import { COLORS } from '../utils/static';
import tw from '../utils/tailwind';
import DrawerItem from './components/DrawerItem';
import BottomNavigator, { HeaderComponent } from './customer/BottomNavigator';
import { useNavigation } from '@react-navigation/native';
import LogoutModal from '../shared/modal/LogoutModal';

const { Navigator, Screen } = createDrawerNavigator();

function CustomDrawerContent() {
  const navigation = useNavigation<any>();
  const [isActive, setIsActive] = useState(false);
  const drawerItems = [
    {
      label: 'Dashboard',
      icon: <SvgDashboard fill={COLORS.secondary} height={22} width={22} />,
      onPress: () => navigation.navigate(ScreenNames.HOME),
    },
    {
      label: 'Post & Campaign',
      icon: (
        <MaterialIcons name="post-add" size={22} style={tw`text-secondary`} />
      ),
      onPress: () => navigation.navigate(ScreenNames.POSTS),
    },
    {
      label: 'Calendar',
      icon: <Feather name="calendar" size={20} style={tw`text-secondary`} />,
      onPress: () => navigation.navigate(ScreenNames.EVENT),
    },
    {
      label: 'Post Alert',
      icon: (
        <Ionicons
          name="alert-circle-outline"
          size={20}
          style={tw`text-secondary`}
        />
      ),
      onPress: () => navigation.navigate(ScreenNames.EVENT),
    },
    {
      label: 'Leaderboard',
      icon: <FontAwesome5 name="users" size={16} style={tw`text-secondary`} />,
    },
    {
      label: 'Analytics Overview',
      icon: (
        <MaterialIcons name="analytics" size={20} style={tw`text-secondary`} />
      ),
      onPress: () => navigation.navigate(ScreenNames.ANALYTICS),
    },
    {
      label: 'Settings',
      icon: (
        <Ionicons
          name="settings-outline"
          size={20}
          style={tw`text-secondary`}
        />
      ),
      onPress: () => navigation.navigate(ScreenNames.USER_PROFILE),
    },
  ];
  return (
    <>
      <View style={tw`p-5 gap-y-10 h-full pt-16`}>
        <View style={tw`gap-y-2 items-center`}>
          <Img source={Config.banner} className="h-75px w-75px rounded-full" />
          <Heading size="lg" type="semibold">
            Suryansh
          </Heading>
        </View>
        <View style={tw`gap-y-4`}>
          {drawerItems.map(item => (
            <>
              <DrawerItem
                title={item.label}
                icon={item.icon}
                styleTitle="text-secondary"
                onPress={item.onPress}
              />
              <Divider className="border-gray-100" />
            </>
          ))}
        </View>
        <Button
          btnName="Logout"
          className="mt-auto"
          icon={<Feather name="log-out" size={16} style={tw`text-white`} />}
          action={() => setIsActive(true)}
        />
      </View>
      <LogoutModal isActive={isActive} close={() => setIsActive(false)} />
    </>
  );
}
const DrawerNavigator = () => {
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
      <Screen
        name={ScreenNames.EVENT_DETAILS}
        component={EventDetails}
        options={{
          headerShown: true,
          header: () => <HeaderComponent hideBars />,
        }}
      />
    </Navigator>
  );
};

export default DrawerNavigator;
