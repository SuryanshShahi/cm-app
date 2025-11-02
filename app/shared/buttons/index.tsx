import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from '../../utils/tailwind';
import Loader from '../Loader';
export interface IButton {
  action?: () => void;
  btnName?: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outlined' | 'disabled' | 'link' | 'brand';
  styleBtnName?: string;
  icon?: ReactNode;
}
const Button: FC<PropsWithChildren<IButton>> = ({
  action,
  btnName,
  className,
  isLoading,
  variant = 'brand',
  children,
  styleBtnName,
  icon,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={tw.style(
        'h-11 px-4 border rounded-lg flex-row gap-x-2 items-center justify-center',
        {
          'bg-primary text-white border-primary': variant === 'primary',
          'bg-brand border-brand': variant === 'brand',
          'border-gray-200': variant === 'outlined',
          'bg-gray-200 border-transparent': Boolean(disabled),
          'p-0 border-0 h-auto self-start rounded-none': variant === 'link',
        },
        className,
      )}
      activeOpacity={disabled ? 1 : 0.5}
      onPress={() => !isLoading && variant !== 'disabled' && action?.()}
    >
      {icon}
      {btnName && (
        <Text
          style={tw.style(
            'font-medium text-base text-center',
            {
              'text-black': variant === 'outlined',
              'text-white': variant === 'primary' || variant === 'brand',
              'text-gray-400': Boolean(disabled),
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
