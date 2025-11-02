import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';
import { BottomIcon, BottomTitle } from './BottomItems';
export interface IRoute {
  key: string;
  name: string;
  params: { [key: string]: any };
}
export const BottomTabBar = (props: any) => {
  const {
    screenProps: { state, descriptors, navigation },
    tabData,
    setIsActive,
  } = props;
  const animBottomBar = useRef<any>(new Animated.Value(100)).current;
  useEffect(() => {
    Animated.spring(animBottomBar, {
      toValue: 0,
      delay: 0.2,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        tw`shadow-2xl flex-row shadow-neutral-700 pb-2 px-[6px] pt-[10px] bg-white`,
        { transform: [{ translateY: animBottomBar }] },
      ]}
    >
      {(state.routes as IRoute[])?.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={tabData[index]?.title ? onPress : () => setIsActive(true)}
            activeOpacity={0.5}
            style={tw`flex-1 items-center`}
          >
            {/* {isFocused && (
              <View
                style={tw`bg-primary w-9 h-1 rounded-[10px] -top-3 absolute`}
              />
            )} */}
            <BottomIcon
              icon={
                isFocused ? tabData[index]?.focusIcon : tabData[index]?.icon
              }
              count={tabData[index]?.count}
              className={!tabData[index]?.title}
            />
            <BottomTitle title={tabData[index]?.title} isActive={isFocused} />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};
