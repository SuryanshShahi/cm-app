import React, {FC, PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import tw from '../../utils/tailwind';
interface ICardWrapper {
  className?: string;
  onPress?: (() => void) | null;
  variant?: 'dark-shadow';
}
const CardWrapper: FC<PropsWithChildren<ICardWrapper>> = ({
  className,
  children,
  onPress,
  variant,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      activeOpacity={onPress ? 0.6 : 1}
      style={tw.style(
        'p-4 rounded-2xl bg-white gap-y-4 border border-gray-50 shadow-lg shadow-neutral-200',
        {'shadow-lg shadow-neutral-500': variant === 'dark-shadow'},
        className,
      )}>
      {children}
    </TouchableOpacity>
  );
};

export default CardWrapper;
