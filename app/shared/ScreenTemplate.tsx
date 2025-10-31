import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import tw from '../utils/tailwind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface IScreenTemplate {
  bottomBar?: ReactNode;
  className?: string;
}
const ScreenTemplate: FC<PropsWithChildren<IScreenTemplate>> = ({
  children,
  bottomBar,
  className,
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={tw`h-full`}>
      <ScrollView style={tw`flex-1 p-5`}>
        <View style={tw.style(`pb-${top + 20}px`, className)}>{children}</View>
      </ScrollView>
      {bottomBar && <View style={tw`m-4`}>{bottomBar}</View>}
    </View>
  );
};

export default ScreenTemplate;
