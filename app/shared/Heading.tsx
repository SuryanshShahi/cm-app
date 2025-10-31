import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Text } from 'react-native';
import tw from '../utils/tailwind';
export interface IHeading {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  type?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  color?: 'primary' | 'secondary' | 'tertiary' | 'brand' | 'white' | 'black';
  className?: string;
  children: ReactNode;
  onPress?: () => void;
}
const Heading: FC<PropsWithChildren<IHeading>> = ({
  children,
  size,
  type,
  color = 'primary',
  className,
  onPress,
  ...rest
}) => {
  return (
    <Text
      style={tw.style(`text-${size} font-${type} text-${color}`, className)}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Heading;
