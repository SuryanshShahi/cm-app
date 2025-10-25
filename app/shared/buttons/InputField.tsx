import React, { ReactNode } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import tw from '../../utils/tailwind';
import Heading from '../Heading';
import { SvgArrow } from '../../svgs';

const InputField = ({
  label,
  className,
  wrapperClassName,
  primaryIcon,
  secondaryIcon,
  ...rest
}: {
  label?: string;
  className?: string;
  wrapperClassName?: string;
  primaryIcon?: ReactNode;
  secondaryIcon?: ReactNode;
} & TextInputProps) => {
  return (
    <View style={tw.style(`gap-y-1`, wrapperClassName)}>
      {label && <Heading>{label}</Heading>}
      <View style={tw``}>
        <View style={tw`absolute left-2 top-[10px] z-10`}>{primaryIcon}</View>
        <TextInput
          style={tw.style(
            `h-11 rounded-md w-full bg-gray-100 border border-gray-200 px-3`,
            { 'pl-9': Boolean(primaryIcon), 'pr-6': Boolean(secondaryIcon) },
            className,
          )}
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
