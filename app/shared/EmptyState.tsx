import React from 'react';
import { View } from 'react-native';
import Config from '../../assets/Config';
import tw from '../utils/tailwind';
import Heading from './Heading';
import Img from './Img';

const EmptyState = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <View
      style={tw.style(`items-center justify-center gap-y-1 mt-8`, className)}
    >
      <Img source={Config.emptyState} className="h-80px w-120px" />
      <Heading size="xl" type="semibold">
        {title}
      </Heading>
      <Heading size="base" type="normal" color="tertiary">
        {description}
      </Heading>
    </View>
  );
};

export default EmptyState;
