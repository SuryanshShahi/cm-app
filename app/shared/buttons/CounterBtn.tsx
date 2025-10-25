import { View } from 'react-native';
import React from 'react';
import tw from '../../utils/tailwind';
import Heading from '../Heading';
import Button from '.';
import { Feather } from '../../utils/Icons';

const CounterBtn = ({
  count,
  setCount,
  className,
}: {
  count: number;
  setCount: (count: number) => void;
  className?: string;
}) => {
  return (
    <View style={tw.style(`gap-2 flex-row items-center`, className)}>
      <Button
        className="bg-primary/5 border-transparent py-1 px-2"
        action={() => count !== 0 && setCount(count - 1)}
      >
        <Feather name="minus" size={16} style={tw`text-primary`} />
      </Button>
      <Heading size="base">{count?.toString() || '0'}</Heading>
      <Button
        className="bg-primary/5 border-transparent py-1 px-2"
        action={() => count !== 10 && setCount(count + 1)}
      >
        <Feather name="plus" size={16} style={tw`text-primary`} />
      </Button>
    </View>
  );
};

export default CounterBtn;
