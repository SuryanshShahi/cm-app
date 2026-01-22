import React from 'react';
import { View } from 'react-native';
import Config from '../../../assets/Config';
import { Heading } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { IUserCard, UserCard } from '../../shared/UserCard';
import tw from '../../utils/tailwind';

const TopPerformers = ({ data }: { data: IUserCard[] }) => {
  return (
    <ScreenTemplate className="gap-y-4">
      <Heading size="lg" type="semibold">
        Top 5 performer
      </Heading>

      <View style={tw`gap-y-4`}>
        {data.map((item, idx) => (
          <UserCard
            data={{ ...item, secondaryImage: Config.spark }}
            key={idx}
          />
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default TopPerformers;
