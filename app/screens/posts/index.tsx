import React from 'react';
import { Linking } from 'react-native';
import { Loader } from '../../shared';
import PostCard from '../../shared/cards/PostCard';
import EmptyState from '../../shared/EmptyState';
import ScreenTemplate from '../../shared/ScreenTemplate';
import useHook from './useHook';

const Posts = () => {
  const { posts, isLoading, refetch } =
    useHook();
  return isLoading ? (
    <Loader size={40} parentClass="flex-1 justify-center items-center h-full" />
  ) : (
    <ScreenTemplate className="gap-y-4" parentClassName='bg-white'>
      {Number(posts?.length) > 0 ? (
        posts?.map((item, idx) => (
          <PostCard
            key={idx}
            onPress={() => Linking.openURL(item.postLink)}
            data={item}
            refetch={refetch}
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
