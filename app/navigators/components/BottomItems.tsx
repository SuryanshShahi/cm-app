import React, { ReactNode } from 'react';
import { View, Image, ImageSourcePropType, Text } from 'react-native';
import tw from '../../utils/tailwind';
import { width } from '../../utils/constants';

export const BottomIcon = ({
  source,
  iconClass,
  count,
  icon,
  className,
}: {
  source?: ImageSourcePropType;
  iconClass?: string;
  icon?: ReactNode;
  count?: number;
  className?: boolean | string;
}) => {
  return (
    <View
      style={tw` ${
        className
          ? `bg-primary mx-auto absolute border-[7px] border-white items-center justify-center rounded-full ${
              width > 768
                ? 'h-[80px] w-[80px] -top-12'
                : 'h-[60px] w-[60px] -top-9'
            } ${className}`
          : ''
      }`}
    >
      <View style={tw`h-5`}>{icon}</View>
      {source && (
        <Image
          style={tw`h-5 w-5 ${width > 768 ? 'h-8 w-8' : ''} ${iconClass || ''}`}
          resizeMode="contain"
          source={source}
        />
      )}
      {Boolean(count) && (
        <View
          style={tw`bg-primary h-4 w-4 rounded-full absolute -top-1 -right-4`}
        >
          <Text style={tw`text-white text-[8px] font-medium m-auto`}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
};

export const BottomTitle = ({
  title,
  isActive,
}: {
  title: string;
  isActive?: boolean;
}) => {
  return (
    <Text
      style={tw`font-medium text-xs mt-1 ${
        isActive ? 'text-brand' : 'text-black'
      } ${width > 768 ? 'text-base' : ''}`}
    >
      {title}
    </Text>
  );
};
