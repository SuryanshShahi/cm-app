import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../apis';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
interface IPost {
  id: string;
  cmId: string;
  platformType: string;
  postLink: string;
  mediaUrl: string;
  title: string;
  description: string;
  status: string;
  shareUrl: string;
  createdAt: string;
  updatedAt: string;
}
const useHook = () => {
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
    isLiked: false,
    shareUrl: item.shareUrl,
    postLink: item.postLink,
  }));
  return { posts, isLoading };
};

export default useHook;
