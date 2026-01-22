import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import tw from '../utils/tailwind';
const Message = ({
  title,
  description,
  className,
  icon,
  styleTitle,
  color,
}: {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  styleTitle?: string;
  color?: 'gray' | 'yellow' | 'red' | 'primary';
}) => {
  return (
    <View style={tw`flex-row gap-x-4 rounded-lg ${className || ''}`}>
      <View
        style={tw.style(
          'h-[50px] w-[50px] rounded-full',
          { 'bg-gray-50': color === 'gray' },
          { 'bg-yellow-50': color === 'yellow' },
          { 'bg-red-50': color === 'red' },
          { 'bg-primary/5': color === 'primary' },
        )}
      >
        <View
          style={tw.style(
            'h-[38px] w-[38px] rounded-full m-auto items-center justify-center',
            { 'bg-gray-100': color === 'gray' },
            { 'bg-yellow-100': color === 'yellow' },
            { 'bg-red-100': color === 'red' },
            { 'bg-primary/10': color === 'primary' },
          )}
        >
          {icon}
        </View>
      </View>
      <View style={tw`flex-1`}>
        {title && (
          <Text
            style={tw`text-lg text-black font-semibold ${styleTitle || ''}`}
          >
            {title}
          </Text>
        )}
        {description && <Text style={tw`text-gray-500`}>{description}</Text>}
      </View>
    </View>
  );
};

export default Message;
