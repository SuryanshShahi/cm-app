import React from 'react';
import { Linking } from 'react-native';
import PostCard from '../../shared/cards/PostCard';
import ScreenTemplate from '../../shared/ScreenTemplate';
import useHook from './useHook';

const Posts = () => {
  const { posts } = useHook();
  return (
    <ScreenTemplate className="gap-y-4">
      {posts?.map((item, idx) => (
        <PostCard
          key={idx}
          onPress={() => Linking.openURL(item.postLink)}
          data={item}
        />
      ))}
    </ScreenTemplate>
  );
};

export default Posts;
