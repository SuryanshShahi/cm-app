import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import tw from '../utils/tailwind';

interface IImage extends Omit<FastImageProps, 'source'> {
  className?: string;
  source?: FastImageProps['source'] | string;
}
const Img = ({ className, source, ...rest }: IImage) => {
  return (
    <FastImage
      source={typeof source === 'string' ? { uri: source } : source}
      {...rest}
      style={tw.style(className)}
    />
  );
};

export default Img;
