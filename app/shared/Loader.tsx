import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import tw from '../utils/tailwind';
import { COLORS } from '../utils/static';

const Loader = ({
  className,
  color,
  size,
  parentClass,
}: {
  className?: string;
  color?: string;
  size?: number;
  parentClass?: string;
}) => {
  return (
    <View style={tw.style(parentClass)}>
      <ActivityIndicator
        size={size ? size : 'small'}
        style={tw`shadow-black py-1 ${className ?? ''}`}
        color={color || COLORS.brand}
      />
    </View>
  );
};
export default Loader;
