import React from 'react';
import { View } from 'react-native';
import { Heading, Img } from '.';
import tw from '../utils/tailwind';

export interface IUserCard {
  image: string;
  name: string;
  description: string;
  secondaryImage?: string;
}
export const UserCard = ({ data }: { data: IUserCard }) => {
  return (
    <View style={tw`gap-x-4 flex-row items-center`}>
      {data.image ? (
        <Img source={data.image} className="h-16 w-16 rounded-full" />
      ) : (
        <View style={tw`h-16 w-16 rounded-full bg-gray-200`}>
          <Heading size="xl" className='m-auto'>{data.name?.charAt(0)}</Heading>
        </View>
      )}
      <View style={tw`gap-y-2`}>
        <Heading size="base">{data.name}</Heading>
        <Heading size="xs">{data.description}</Heading>
      </View>
      {data.secondaryImage && (
        <Img source={data.secondaryImage} className="h-55px w-55px ml-auto" />
      )}
    </View>
  );
};
