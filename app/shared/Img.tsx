import React from 'react';
import { Image, ImageProps } from 'react-native';
import tw from '../utils/tailwind';

interface IImage extends ImageProps {
  className?: string;
}
const Img = ({ className, source, ...rest }: IImage) => {
  return (
    <Image
      source={typeof source === 'string' ? { uri: source } : source}
      {...rest}
      style={tw.style(className)}
    />
  );
};

export default Img;
