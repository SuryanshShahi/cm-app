import React from 'react';
import { View } from 'react-native';
import { SvgArrow } from '../svgs';
import tw from '../utils/tailwind';
import Heading from './Heading';
import Button, { IButton } from './buttons';

const HeadingWithBtn = ({
  label,
  className,
  btnName,
  onPress,
}: {
  label: string;
  className?: string;
  btnName?: string;
  onPress?: () => void;
}) => {
  return (
    <View style={tw.style(`flex-row justify-between`, className)}>
      <Heading size="lg" color="black" type="semibold">
        {label}
      </Heading>
      <Button
        btnName={btnName || 'View All'}
        styleBtnName="text-sm"
        className="gap-x-1 mt-1"
        children={
          <SvgArrow
            stroke="black"
            height={16}
            width={16}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        }
        variant="link"
        action={onPress}
      />
    </View>
  );
};

export default HeadingWithBtn;
