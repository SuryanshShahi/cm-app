import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../utils/tailwind';
import { ChipVariant } from '../utils/enums';
export type ChipVariantType =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'orange';

export interface IChip {
  title: ReactNode;
  image?: string | ReactNode;
  variant?: ChipVariantType;
  type?: 'tag' | 'image' | 'primary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  secondaryIcon?: ReactNode;
  styleTitle?: string;
}
const Chip = ({
  title,
  image,
  variant = ChipVariant.Brand,
  type,
  size = 'md',
  className,
  onClick,
  secondaryIcon,
  styleTitle,
}: IChip) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={tw.style(
        onClick && 'cursor-pointer',
        'border h-max gap-x-[6px] flex-row justify-center items-center capitalize rounded-[6px] font-medium self-start',
        {
          'border-gray-200 bg-gray-50': variant === 'gray',
          'border-brand/50 bg-brand/10': variant === 'brand',
          'border-red-200 bg-red-50': variant === 'error',
          'border-yellow-200 bg-yellow-50': variant === 'warning',
          'border-green-200 bg-green-50': variant === 'success',
          'border-blue-200 bg-blue-50': variant === 'blue',
          'border-purple-200 bg-purple-50': variant === 'purple',
          'border-pink-200 bg-pink-50': variant === 'pink',
          'border-orange-200 bg-orange-50': variant === 'orange',
        },
        { 'text-xs': size === 'xs' },
        { 'text-sm': size === 'sm' || size === 'md' },
        { 'text-base': size === 'lg' },
        image
          ? {
              'px-1 py-[2px]': size === 'sm' || size === 'xs',
              'px-[6px] py-[2px]': size === 'md',
              'px-2 py-1': size === 'lg',
            }
          : {
              'px-[6px] py-[2px]': size === 'sm' || size === 'xs',
              'px-2 py-[2px]': size === 'md',
              'px-[10px] py-1': size === 'lg',
            },
        className,
      )}
    >
      {type === 'tag' && (
        <View
          style={tw.style('h-[7px] w-[7px] rounded-full', {
            'bg-gray-500': variant === 'gray',
            'bg-brand': variant === 'brand',
            'bg-red-500': variant === 'error',
            'bg-yellow-500': variant === 'warning',
            'bg-green-500': variant === 'success',
            'bg-blue-500': variant === 'blue',
            'bg-purple-500': variant === 'purple',
            'bg-pink-500': variant === 'pink',
            'bg-orange-500': variant === 'orange',
          })}
        />
      )}
      {image}
      <Text
        style={tw.style(
          { 'text-xs': size === 'xs' },
          { 'text-sm': size === 'sm' },
          { 'text-base': size === 'md' },
          { 'text-lg': size === 'lg' },
          {
            'text-gray-700': variant === 'gray',
            'text-brand': variant === 'brand',
            'text-red-500': variant === 'error',
            'text-yellow-500': variant === 'warning',
            'text-green-500': variant === 'success',
            'text-blue-500': variant === 'blue',
            'text-purple-500': variant === 'purple',
            'text-pink-500': variant === 'pink',
            'text-orange-500': variant === 'orange',
          },
          styleTitle,
        )}
      >
        {title}
      </Text>
      {secondaryIcon}
    </TouchableOpacity>
  );
};

export default Chip;
