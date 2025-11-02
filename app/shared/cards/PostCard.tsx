import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import tw from '../../utils/tailwind';
import Heading from '../Heading';
import Img from '../Img';

const PostCard = ({
  data,
}: {
  data: {
    banner: ImageSourcePropType;
    description: string;
    isLiked: boolean;
  };
}) => {
  return (
    <View style={tw`bg-white rounded-xl shadow-lg shadow-neutral-400`}>
      <Img source={data.banner} className="h-213px w-full rounded-t-xl" />
      <View style={tw`p-4 gap-y-4`}>
        <View style={tw`flex-row gap-x-6`}>
          <Octicons
            name={data.isLiked ? 'heart-fill' : 'heart'}
            size={24}
            onPress={() => {}}
          />
          <MaterialCommunityIcons name="comment-text-outline" size={24} />
          <Feather name="share-2" size={24} style={tw`text-brand`} />
        </View>
        <Heading className="leading-5">{data.description}</Heading>
      </View>
    </View>
  );
};

export default PostCard;
