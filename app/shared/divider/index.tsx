import React from 'react';
import { View } from 'react-native';
import tw from '../../utils/tailwind';

const Divider = ({
  className,
  variant = 'tertiary',
}: {
  className?: string;
  variant?: 'secondary' | 'tertiary' | 'primary';
}) => {
  return (
    <View
      style={tw.style(
        'h-[1px] w-full border-t',
        `border-${variant}`,
        className,
      )}
    />
  );
};

export default Divider;
