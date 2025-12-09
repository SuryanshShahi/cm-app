import React from 'react';
import { Linking } from 'react-native';
import PostCard from '../../shared/cards/PostCard';
import ScreenTemplate from '../../shared/ScreenTemplate';
import useHook from './useHook';
import { Loader } from '../../shared';
import EmptyState from '../../shared/EmptyState';

const Posts = () => {
  const { posts, isLoading } = useHook();
  return (
    <ScreenTemplate className="gap-y-4">
      {isLoading ? (
        <Loader />
      ) : Number(posts?.length) > 0 ? (
        posts?.map((item, idx) => (
          <PostCard
            key={idx}
            onPress={() => Linking.openURL(item.postLink)}
            data={item}
          />
        ))
      ) : (
        <EmptyState
          className="h-full"
          title="No Posts Found"
          description="When posts are added, they will appear here"
        />
      )}
    </ScreenTemplate>
  );
};

export default Posts;
