import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import tw from '../../utils/tailwind';
import Loader from '../Loader';
interface IProps {
  action?: () => void;
  btnName?: string;
  className?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'outlined' | 'disabled' | 'link' | 'brand';
  styleBtnName?: string;
  icon?: ReactNode;
}
const Button: FC<PropsWithChildren<IProps>> = ({
  action,
  btnName,
  className,
  isLoading,
  variant = 'primary',
  children,
  styleBtnName,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={tw.style(
        'h-11 px-4 border rounded-lg flex-row gap-x-2 items-center justify-center',
        {
          'bg-primary text-white border-black': variant === 'primary',
          'bg-brand border-brand': variant === 'brand',
          'border-gray-200': variant === 'outlined',
          'bg-gray-200 border-transparent': variant === 'disabled',
          'p-0 border-0 h-auto self-start rounded-none': variant === 'link',
        },
        className,
      )}
      activeOpacity={variant === 'disabled' ? 1 : 0.5}
      onPress={() => !isLoading && variant !== 'disabled' && action?.()}
    >
      {icon}
      {btnName && (
        <Text
          style={tw.style(
            'font-medium text-base text-center',
            {
              'text-black': variant === 'outlined',
              'text-white': variant === 'primary',
              'text-gray-400': variant === 'disabled',
              'opacity-0': Boolean(isLoading),
            },
            styleBtnName,
          )}
        >
          {btnName}
        </Text>
      )}
      {isLoading && (
        <Loader
          className="shadow-none bg-transparent py-0"
          parentClass="absolute"
          color={'white'}
        />
      )}
      {children}
    </TouchableOpacity>
  );
};

export default Button;
