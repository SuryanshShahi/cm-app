import React, { Dispatch, SetStateAction } from 'react';
import {
  Route,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import { COLORS } from '../utils/static';
import tw from '../utils/tailwind';
import { width } from '../utils/constants';

const NavTabBar = ({
  renderScene,
  index,
  setIndex,
  routes,
  className,
}: {
  routes: any;
  renderScene: (
    props: SceneRendererProps & {
      route: Route;
    },
  ) => React.ReactNode;
  index: number;
  className?: string;
  setIndex: Dispatch<SetStateAction<number>>;
}) => {
  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        tabStyle={tw.style(`p-0`, `w-${(width - 50) / routes?.length}px`)}
        style={tw.style(
          'shadow-none rounded-10px bg-gray-100 mb-2 mx-5',
          routes?.length > 4 && 'px-[6px]',
        )}
        contentContainerStyle={tw`px-1`}
        indicatorStyle={tw`relative top-0.5px h-38px my-1 bg-brand rounded-lg`}
        inactiveColor={COLORS.secondary}
        pressColor="#F3F4F6"
        scrollEnabled
        activeColor="white"
      />
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      style={tw.style('bg-bgColor pt-5', className)}
    />
  );
};
export default NavTabBar;
