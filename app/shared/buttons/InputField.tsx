import React, { ReactNode } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import tw from '../../utils/tailwind';
import Heading from '../Heading';
import { COLORS } from '../../utils/static';

const InputField = ({
  label,
  className,
  wrapperClassName,
  primaryIcon,
  secondaryIcon,
  required,
  disabled,
  ...rest
}: {
  label?: string;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
  disabled?: boolean;
  primaryIcon?: ReactNode;
  secondaryIcon?: ReactNode;
} & TextInputProps) => {
  return (
    <View style={tw.style(`gap-y-1`, wrapperClassName)}>
      {label && (
        <Heading>
          {label}
          {required && <Text style={tw`text-red-500`}> *</Text>}
        </Heading>
      )}
      <View style={tw``}>
        <View style={tw`absolute left-3 top-[10px] z-10`}>{primaryIcon}</View>
        <TextInput
          style={tw.style(
            `h-11 rounded-md w-full border border-gray-300 px-3`,
            { 'pl-10': Boolean(primaryIcon), 'pr-6': Boolean(secondaryIcon) },
            { 'bg-gray-100 text-secondary': Boolean(disabled) },
            className,
          )}
          placeholderTextColor={COLORS.secondary}
          editable={!disabled}
          {...rest}
        />
        <View style={tw`absolute right-2 top-[10px] z-10`}>
          {secondaryIcon}
        </View>
      </View>
    </View>
  );
};

export default InputField;
