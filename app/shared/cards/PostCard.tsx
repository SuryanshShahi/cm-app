import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Linking, Share, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  confirmInteraction,
  interactionComment,
  interactionLike,
  interactionShare,
} from '../../apis';
import { IConfirmInteraction } from '../../apis/types';
import { convertDate, showToast } from '../../utils/constants';
import tw from '../../utils/tailwind';
import Button from '../buttons';
import Heading from '../Heading';
import Img from '../Img';

const PostCard = ({
  data,
  onPress,
  refetch,
}: {
  data: {
    id: string;
    banner: string;
    postLink: string;
    title: string;
    description: string;
    shareUrl?: string;
    likeStatus: string;
    commentStatus: string;
    createdAt: string;
  };
  onPress?: () => void;
  refetch?: () => void;
}) => {
  const { mutate: handleLike } = useMutation({
    mutationFn: (body: { postId: string }) => interactionLike(body),
    onSuccess: () => {
      refetch?.();
    },
    onError: () =>
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      }),
  });
  const { mutate: handleComment } = useMutation({
    mutationFn: (body: { postId: string }) => interactionComment(body),
    onSuccess: () => {
      refetch?.();
    },
    onError: () =>
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      }),
  });
  const { mutate: handleShare } = useMutation({
    mutationFn: (body: { postId: string }) => interactionShare(body),
    onSuccess: async () => { },
    onError: () =>
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      }),
  });
  const { mutate: confirmInteractionMutation } = useMutation({
    mutationFn: (body: IConfirmInteraction) => confirmInteraction(body),
    onSuccess: () => {
      setIsLoading('');
      refetch?.();
    },
    onError: () => {
      setIsLoading('');
      showToast({
        text1: 'Something went wrong',
        type: 'error',
      });
    },
  });
  const [isLoading, setIsLoading] = useState('');
  return (
    <TouchableOpacity
      style={tw`bg-gray-200 p-2 rounded-2xl shadow-lg shadow-neutral-400`}
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}
    >
      <View>
        <Img
          source={data.banner}
          className="h-213px w-full rounded-xl bg-gray-50"
        />
        {(data.likeStatus === 'pending' ||
          data.commentStatus === 'pending') && (
            <View
              style={tw`p-4 absolute h-full w-full bg-black/75 flex-col justify-center items-center gap-y-2 rounded-lg`}
            >
              <Heading size="base" className="text-center" color="white">
                {data.likeStatus === 'pending'
                  ? 'Did you like this post?'
                  : 'Did you comment on this post?'}
              </Heading>
              <View style={tw`flex-row gap-x-4`}>
                <Button
                  btnName="No"
                  styleBtnName='text-red-500'
                  className="px-5 h-9 bg-red-500/20 border-red-500"
                  action={() => {
                    setIsLoading('no');
                    confirmInteractionMutation({
                      postId: data.id,
                      actionType:
                        data.likeStatus === 'pending' ? 'like' : 'comment',
                      action: false,
                    });
                  }}
                  isLoading={isLoading === 'no'}
                />
                <Button
                  btnName="Yes"
                  styleBtnName='text-green-400'
                  className="px-5 h-9 bg-green-500/20 border-green-400"
                  action={() => {
                    setIsLoading('yes');
                    confirmInteractionMutation({
                      postId: data.id,
                      actionType:
                        data.likeStatus === 'pending' ? 'like' : 'comment',
                      action: true,
                    });
                  }}
                  isLoading={isLoading === 'yes'}
                />
              </View>
            </View>
          )}
      </View>
      <View style={tw`p-4 gap-y-4`}>
        <View style={tw`gap-y-1`}>
          <Heading className="leading-5 font-medium text-black" size="base">
            {data.title}
          </Heading>
          <Heading className="leading-5" color="secondary">
            {data.description}
          </Heading>
        </View>
        <View style={tw`flex-row gap-x-6 items-center`}>
          <Octicons
            name={data.likeStatus === 'verified' ? 'heart-fill' : 'heart'}
            style={tw.style(data.likeStatus === 'verified' ? 'text-red-600' : 'text-gray-500')}
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
          <Button btnName='Share' className='bg-brand text-white ml-auto gap-x-3' icon={<Feather name="share-2" size={20} style={tw`text-white`} />} action={async () => {
            try {
              await Share.share({
                message: `${data.title}\n${data.description}\n\nLink - ${data.shareUrl}`,
                url: data.shareUrl,
              });
            } catch (error) {
              console.log('Error sharing:', error);
            }
            handleShare({ postId: data.id });
          }} />

        </View>
        <Heading size="xs" color="secondary">
          Posted on: {convertDate(data.createdAt)}
        </Heading>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
