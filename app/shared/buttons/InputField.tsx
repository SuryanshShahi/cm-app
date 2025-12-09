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
  errorMessage,
  ...rest
}: {
  label?: string;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  primaryIcon?: ReactNode;
  secondaryIcon?: ReactNode;
} & TextInputProps) => {
  const isMultiline = Boolean((rest.numberOfLines ?? 1) > 1 || rest.multiline);
  return (
    <View style={tw.style(`gap-y-1`, wrapperClassName)}>
      {label && (
        <Heading>
          {label}
          {required && <Text style={tw`text-red-500`}> *</Text>}
        </Heading>
      )}
      <View style={tw`gap-y-1`}>
        <View style={tw`absolute left-3 top-[10px] z-10`}>{primaryIcon}</View>
        <TextInput
          style={tw.style(
            isMultiline
              ? `rounded-md w-full border border-gray-300 px-3 py-2`
              : `h-11 rounded-md w-full border border-gray-300 px-3`,
            { 'pl-10': Boolean(primaryIcon), 'pr-6': Boolean(secondaryIcon) },
            disabled && 'bg-gray-100 text-secondary',
            errorMessage && 'border-red-500',
            className,
          )}
          multiline={isMultiline}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          placeholderTextColor={COLORS.secondary}
          editable={!disabled}
          {...rest}
        />
        <View style={tw`absolute right-2 top-[10px] z-10`}>
          {secondaryIcon}
        </View>
        {errorMessage && (
          <Text style={tw`text-xs text-red-500`}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

export default InputField;
