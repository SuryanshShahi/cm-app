import React, { useState } from 'react';
import { Entypo, Feather, MaterialIcons, Octicons } from '../../utils/Icons';
import tw from '../../utils/tailwind';
import { BottomTabBar } from '../components/BottomTabBar';
import { TabBarProps } from '../types';

export const CustomerTabBar = ({
  state,
  descriptors,
  navigation,
}: TabBarProps) => {
  const [isActive, setIsActive] = useState(false);
  const tabData = [
    {
      title: 'Home',
      focusIcon: <Octicons name="home" size={20} style={tw`text-brand`} />,
      icon: <Octicons name="home" size={20} style={tw`text-black`} />,
    },
    {
      title: 'Posts',
      focusIcon: (
        <MaterialIcons name="post-add" size={22} style={tw`text-brand`} />
      ),
      icon: <MaterialIcons name="post-add" size={22} style={tw`text-black`} />,
    },
    {
      title: 'Calendar',
      focusIcon: <Feather name="calendar" size={20} style={tw`text-brand`} />,
      icon: <Feather name="calendar" size={20} style={tw`text-black`} />,
    },
    {
      title: 'Analytics',
      focusIcon: <Entypo name="bar-graph" size={20} style={tw`text-brand`} />,
      icon: <Entypo name="bar-graph" size={20} style={tw`text-black`} />,
    },
    {
      title: 'Profile',
      focusIcon: <Octicons name="person" size={22} style={tw`text-brand`} />,
      icon: <Octicons name="person" size={22} style={tw`text-black`} />,
    },
  ];

  const props = {
    screenProps: { state, descriptors, navigation },
    setIsActive,
    tabData,
  };

  return <BottomTabBar {...props} />;
};
