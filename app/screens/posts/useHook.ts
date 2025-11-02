import { useQuery } from '@tanstack/react-query';
import {
    getPosts
} from '../../apis';
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
  const { data } = useQuery<{ posts: IPost[]; pagination: { limit: number } }>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
  const posts = data?.posts.map(item => ({
    id: item.id,
    banner: item.mediaUrl,
    description: item.description,
    isLiked: false,
    shareUrl: item.shareUrl,
    postLink: item.postLink,
  }));
  return { posts };
};

export default useHook;
