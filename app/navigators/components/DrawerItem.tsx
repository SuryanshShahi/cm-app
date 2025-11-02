import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgArrow } from '../../svgs';
import tw from '../../utils/tailwind';

const DrawerItem = ({
  icon,
  title,
  styleTitle,
  arrowNotVisible,
  onPress,
  className,
}: {
  icon?: ReactNode;
  title: string;
  styleTitle?: string;
  arrowNotVisible?: boolean;
  onPress?: () => void;
  className?: string;
}) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center gap-x-3 ${className || ''}`}
      onPress={onPress}
    >
      {icon}
      <Text style={tw`text-base text-black ${styleTitle || ''}`}>{title}</Text>
      <View style={tw`ml-auto flex-row items-center gap-x-2`}>
        {!arrowNotVisible && (
          <SvgArrow
            stroke="black"
            height={20}
            width={20}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DrawerItem;
