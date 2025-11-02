import React from 'react';
import { Image, ImageProps, ImageSourcePropType } from 'react-native';
import tw from '../utils/tailwind';

interface IImage extends Omit<ImageProps, 'source'> {
  className?: string;
  source?: ImageSourcePropType | string;
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
