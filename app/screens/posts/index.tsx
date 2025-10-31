import React, { useState } from 'react';
import { View } from 'react-native';
import Config from '../../../assets/Config';
import { Heading, Img } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { Feather, MaterialCommunityIcons, Octicons } from '../../utils/Icons';
import tw from '../../utils/tailwind';

const Posts = () => {
  const [isLiked, setIsLiked] = useState(false);
  const data = {
    bannerImage: Config.banner,
    description:
      "Bharatiya Janata Party (BJP): Explore the Latest Insights, Multimedia, and Updates on BJP's Activities and Initiatives.",
  };
  return (
    <ScreenTemplate className="gap-y-4">
      {Array(5)
        .fill(data)
        .map((item, idx) => (
          <View style={tw`bg-white rounded-xl`} key={idx}>
            <Img
              source={item.bannerImage}
              className="h-213px w-full rounded-t-xl"
            />
            <View style={tw`p-4 gap-y-4`}>
              <View style={tw`flex-row gap-x-6`}>
                <Octicons name={isLiked ? 'heart-fill' : 'heart'} size={24} />
                <MaterialCommunityIcons name="comment-text-outline" size={24} />
                <Feather name="share-2" size={24} style={tw`text-brand`} />
              </View>
              <Heading className="leading-5">{item.description}</Heading>
            </View>
          </View>
        ))}
    </ScreenTemplate>
  );
};

export default Posts;
