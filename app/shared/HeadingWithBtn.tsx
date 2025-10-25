import React from 'react';
import { View } from 'react-native';
import { SvgArrow } from '../svgs';
import tw from '../utils/tailwind';
import Heading from './Heading';
import Button from './buttons';

const HeadingWithBtn = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <View style={tw.style(`flex-row justify-between`, className)}>
      <Heading size="base" color="black" type="semibold">
        {label}
      </Heading>
      <Button
        btnName="View All"
        styleBtnName="text-xs"
        className="gap-x-1 mt-1"
        children={
          <SvgArrow
            stroke="black"
            height={14}
            width={14}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        }
        variant="link"
      />
    </View>
  );
};

export default HeadingWithBtn;
