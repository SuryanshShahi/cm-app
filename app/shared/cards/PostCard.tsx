import React from 'react';
import { Linking, Share, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import tw from '../../utils/tailwind';
import Heading from '../Heading';
import Img from '../Img';
import { useMutation } from '@tanstack/react-query';
import {
  interactionLike,
  interactionComment,
  interactionShare,
} from '../../apis';
import { showToast } from '../../utils/constants';

const PostCard = ({
  data,
  onPress,
}: {
  data: {
    id: string;
    banner: string;
    postLink: string;
    title: string;
    description: string;
    isLiked: boolean;
    shareUrl?: string;
  };
  onPress?: () => void;
}) => {
  const { mutate: handleLike } = useMutation({
    mutationFn: (body: { postId: string }) => interactionLike(body),
    onSuccess: () => {},
    onError: () =>
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      }),
  });
  const { mutate: handleComment } = useMutation({
    mutationFn: (body: { postId: string }) => interactionComment(body),
    onSuccess: () => {},
    onError: () =>
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      }),
  });
  const { mutate: handleShare } = useMutation({
    mutationFn: (body: { postId: string }) => interactionShare(body),
    onSuccess: async () => {},
    onError: () =>
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      }),
  });

  return (
    <TouchableOpacity
      style={tw`bg-white rounded-xl shadow-lg shadow-neutral-400`}
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}
    >
      <Img
        source={data.banner}
        className="h-213px w-full rounded-t-xl bg-gray-50"
      />
      <View style={tw`p-4 gap-y-4`}>
        <View style={tw`flex-row gap-x-6`}>
          <Octicons
            name={data.isLiked ? 'heart-fill' : 'heart'}
            size={24}
            onPress={() => {
              Linking.openURL(data.postLink);
              handleLike({ postId: data.id });
            }}
          />
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={24}
            onPress={() => {
              Linking.openURL(data.postLink);
              handleComment({ postId: data.id });
            }}
          />
          <TouchableOpacity
            onPress={async () => {
              try {
                await Share.share({
                  message: `${data.title}\n${data.description}\n\nLink - ${data.shareUrl}`,
                  url: data.shareUrl,
                });
              } catch (error) {
                console.log('Error sharing:', error);
              }
              handleShare({ postId: data.id });
            }}
          >
            <Feather name="share-2" size={24} style={tw`text-brand`} />
          </TouchableOpacity>
        </View>
        <View style={tw`gap-y-1`}>
          <Heading className="leading-5 font-medium text-black" size="base">
            {data.title}
          </Heading>
          <Heading className="leading-5" color="secondary">
            {data.description}
          </Heading>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
