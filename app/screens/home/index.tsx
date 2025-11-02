import React from 'react';
import ScreenTemplate from '../../shared/ScreenTemplate';
import Config from '../../../assets/Config';
import { Button, CardWrapper, Heading, Img } from '../../shared';
import { View } from 'react-native';
import tw from '../../utils/tailwind';
import HeadingWithBtn from '../../shared/HeadingWithBtn';
import PostCard from '../../shared/cards/PostCard';

const Home = () => {
  const data = {
    bannerImage: Config.banner,
    description:
      "Bharatiya Janata Party (BJP): Explore the Latest Insights, Multimedia, and Updates on BJP's Activities and Initiatives.",
  };
  return (
    <ScreenTemplate className="gap-y-6" parentClassName="bg-white">
      <Img source={Config.banner} className="h-200px w-full rounded-lg" />
      <View style={tw`gap-y-4`}>
        <Heading size="xl" className="text-center">
          Voice of the Worker
        </Heading>
        <CardWrapper className="bg-gray-100 gap-y-3 rounded-lg">
          <Heading size="base" type="semibold" className="text-center">
            Write your feedback to CM Directly
          </Heading>
          <Heading className="text-center">
            Limited to 2 Submissions per week
          </Heading>
          <Button
            btnName="Click to write your thoughts"
            className="-mt-2px self-center px-6"
          />
        </CardWrapper>
      </View>
      <View style={tw`gap-y-4`}>
        <Heading size="lg" type="semibold">
          Top 5 performer
        </Heading>
        <View style={tw`gap-y-3`}>
          {Array(2)
            .fill(null)
            .map((item, idx) => (
              <View style={tw`gap-x-4 flex-row items-center`} key={idx}>
                <Img
                  source={Config.banner}
                  className="h-16 w-16 rounded-full"
                />
                <View style={tw`gap-y-2`}>
                  <Heading size="base">Rakesh kumar</Heading>
                  <Heading size="xs">
                    Keep supporting be best Performer{' '}
                  </Heading>
                </View>
                <Img source={Config.spark} className="h-55px w-55px ml-auto" />
              </View>
            ))}
        </View>
        <Button
          btnName="See Top performer & Leaderboard"
          className="self-center px-6"
        />
      </View>
      <View style={tw`gap-y-4`}>
        <HeadingWithBtn label="Today’s Post" btnName="View More" />
        {Array(2)
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
      </View>
    </ScreenTemplate>
  );
};

export default Home;
