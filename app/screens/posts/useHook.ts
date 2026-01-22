import { useMutation, useQuery } from '@tanstack/react-query';
import { confirmInteraction, getPosts } from '../../apis';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { IConfirmInteraction } from '../../apis/types';
interface IPost {
  id: string;
  cmId: string;
  platformType: string;
  postLink: string;
  commentStatus: string;
  likeStatus: string;
  mediaUrl: string;
  title: string;
  description: string;
  status: string;
  shareUrl: string;
  createdAt: string;
  updatedAt: string;
}
const useHook = () => {
  const [isOpen, setIsOpen] = useState('');
  const { data, isLoading, refetch } = useQuery<{
    posts: IPost[];
    pagination: { limit: number };
  }>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );
  const posts = data?.posts.map(item => ({
    id: item.id,
    banner: item.mediaUrl,
    title: item.title,
    description: item.description,
    shareUrl: item.shareUrl,
    postLink: item.postLink,
    commentStatus: item.commentStatus,
    likeStatus: item.likeStatus,
    platformType: item.platformType,
    createdAt: item.createdAt,
  }));

  return {
    posts,
    isLoading,
    isOpen,
    setIsOpen,
    refetch,
  };
};

export default useHook;
