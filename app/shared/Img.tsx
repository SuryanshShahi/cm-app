import React from 'react';
import FastImage, { FastImageProps, Priority } from 'react-native-fast-image';
import tw from '../utils/tailwind';

interface IImage extends Omit<FastImageProps, 'source'> {
  className?: string;
  source?: FastImageProps['source'] | string;
  priority?: Priority;
}
const Img = ({
  className,
  source,
  priority = FastImage.priority.normal,
  ...rest
}: IImage) => {
  const imageSource =
    typeof source === 'string'
      ? {
          uri: source,
          priority,
          cache: FastImage.cacheControl.immutable,
        }
      : source;

  return (
    <FastImage
      source={imageSource}
      {...rest}
      style={tw.style(className)}
    />
  );
};

export default Img;
