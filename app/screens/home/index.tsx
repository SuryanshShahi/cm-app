import React from 'react';
import ScreenTemplate from '../../shared/ScreenTemplate';
import Config from '../../../assets/Config';
import { Button, CardWrapper, Heading, Img, Loader } from '../../shared';
import { Linking, View } from 'react-native';
import tw from '../../utils/tailwind';
import HeadingWithBtn from '../../shared/HeadingWithBtn';
import PostCard from '../../shared/cards/PostCard';
import usePosts from '../posts/useHook';
import ScreenNames from '../../utils/ScreenNames';
import useLeaderboard from '../leaderboard/useHook';
import { UserCard } from '../../shared/UserCard';

const Home = ({ navigation }: any) => {
  const { posts, refetch, isLoading } = usePosts();
  const { leaderboard } = useLeaderboard();
  const topPerformers = leaderboard?.slice(0, 2);
  return isLoading ? <Loader size={40} parentClass="flex-1 justify-center items-center" /> : (
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
            action={() => navigation.navigate(ScreenNames.FEEDBACK)}
          />
        </CardWrapper>
      </View>
      <View style={tw`gap-y-4`}>
        <Heading size="lg" type="semibold">
          Top {topPerformers?.length} performers
        </Heading>
        <View style={tw`gap-y-3`}>
          {topPerformers?.map((item, idx) => (
            <UserCard
              data={{ ...item, secondaryImage: Config.spark }}
              key={idx}
            />
          ))}
        </View>
        <Button
          btnName="See Top performer & Leaderboard"
          className="self-center px-6"
          action={() => navigation.navigate(ScreenNames.LEADERBOARD)}
        />
      </View>
      <View style={tw`gap-y-4 mt-6`}>
        <HeadingWithBtn
          label="Today’s Post"
          btnName="View More"
          onPress={() => navigation.navigate(ScreenNames.POSTS)}
        />
        {posts?.slice(0, 2).map((item, idx) => (
          <PostCard
            key={idx}
            data={item}
            onPress={() => Linking.openURL(item.postLink)}
            refetch={refetch}
          />
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default Home;
