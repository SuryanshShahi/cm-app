import React from 'react';
import Config from '../../../assets/Config';
import PostCard from '../../shared/cards/PostCard';
import ScreenTemplate from '../../shared/ScreenTemplate';

const Posts = () => {
  const data = {
    bannerImage: Config.banner,
    description:
      "Bharatiya Janata Party (BJP): Explore the Latest Insights, Multimedia, and Updates on BJP's Activities and Initiatives.",
  };
  return (
    <ScreenTemplate className="gap-y-4">
      {Array(5)
        .fill(data)
        .map((_, idx) => (
          <PostCard
            key={idx}
            data={{
              banner: data.bannerImage,
              description: data.description,
              isLiked: false,
            }}
          />
        ))}
    </ScreenTemplate>
  );
};

export default Posts;
