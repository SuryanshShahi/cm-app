import React from 'react';
import { View } from 'react-native';
import Heading from '../../shared/Heading';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { IUserCard, UserCard } from '../../shared/UserCard';
import tw from '../../utils/tailwind';
const Rankings = ({ data }: { data: IUserCard[] }) => {
  return (
    <ScreenTemplate className="gap-y-4">
      <Heading size="lg" type="semibold">
        All performers
      </Heading>

      <View style={tw`gap-y-4`}>
        {data.map((item, idx) => (
          <View key={idx} style={tw`gap-x-4 flex-row items-center`}>
            <Heading size="base" type="medium">
              {idx +
                1 +
                (idx === 0 ? 'st' : idx === 1 ? 'nd' : idx === 2 ? 'rd' : 'th')}
            </Heading>
            <UserCard data={{ ...item, secondaryImage: undefined }} />
          </View>
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default Rankings;
