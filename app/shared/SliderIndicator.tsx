import React from 'react';
import { View } from 'react-native';
import tw from '../utils/tailwind';

const SliderIndicator = ({
  length,
  currentIndex,
}: {
  length: number;
  currentIndex: number;
}) => {
  return (
    <View style={tw`flex-row gap-x-2 mx-auto`}>
      {Array(length)
        .fill(null)
        ?.map((_, idx) => (
          <View
            style={tw`h-1 w-4 ${
              Number(currentIndex) === idx ? 'bg-brand' : 'bg-gray-200'
            } rounded-full`}
          />
        ))}
    </View>
  );
};

export default SliderIndicator;
