import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import tw from '../utils/tailwind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface IScreenTemplate {
  bottomBar?: ReactNode;
  className?: string;
  parentClassName?: string;
  styleBottomBar?: string;
}
const ScreenTemplate: FC<PropsWithChildren<IScreenTemplate>> = ({
  children,
  bottomBar,
  className,
  parentClassName,
  styleBottomBar,
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={tw.style(`h-full`, parentClassName)}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw.style(`pb-${top + 20}px pt-5 px-5`, className)}>
          {children}
        </View>
      </ScrollView>
      {bottomBar && (
        <View
          style={tw.style(
            `p-4 rounded-t-2xl border-gray-100 border shadow-lg bg-white`,
            styleBottomBar,
          )}
        >
          {bottomBar}
        </View>
      )}
    </View>
  );
};

export default ScreenTemplate;
