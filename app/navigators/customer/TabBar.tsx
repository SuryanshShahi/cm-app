import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { GlobalContext } from '../../context';
import Button from '../../shared/buttons';
import { Feather, Octicons } from '../../utils/Icons';
import ScreenNames from '../../utils/ScreenNames';
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
      focusIcon: <Octicons name="home" size={20} />,
      icon: <Octicons name="home" size={20} style={tw`text-gray-400`} />,
    },
    {
      title: 'Categories',
      focusIcon: <Feather name="box" size={20} />,
      icon: <Feather name="box" size={20} style={tw`text-gray-400`} />,
    },
    {
      title: 'Cart',
      focusIcon: <Feather name="shopping-cart" size={20} />,
      icon: (
        <Feather name="shopping-cart" size={20} style={tw`text-gray-400`} />
      ),
    },
    {
      title: 'Profile',
      focusIcon: <Octicons name="person" size={20} />,
      icon: <Octicons name="person" size={20} style={tw`text-gray-400`} />,
    },
  ];

  const props = {
    screenProps: { state, descriptors, navigation },
    setIsActive,
    tabData,
  };
  console.log({ state });

  const { data } = useContext(GlobalContext);
  const cartDetails = data?.customerDetails?.cart;
  return (
    <View style={tw`bg-bgColor`}>
      {cartDetails && ![3, 4].includes(state.index) && (
        <View
          style={tw`p-4 m-4 flex-row justify-between items-center bg-white shadow-lg shadow-neutral-300 rounded-2xl`}
        >
          {/* <Heading
            title={`Cart (${cartDetails.items.reduce(
              (acc, item) => acc + item.quantity,
              0,
            )})`}
          /> */}
          <Button
            btnName="Proceed to Cart"
            action={() => navigation.navigate(ScreenNames.CART)}
            className="bg-primary/10 border-0"
            styleBtnName="text-primary"
          />
        </View>
      )}
      <BottomTabBar {...props} />
    </View>
  );
};
