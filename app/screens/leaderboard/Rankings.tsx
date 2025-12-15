import React from 'react';
import ScreenTemplate from '../../shared/ScreenTemplate';
import Heading from '../../shared/Heading';
import { View } from 'react-native';
import Img from '../../shared/Img';
import tw from '../../utils/tailwind';
import Config from '../../../assets/Config';
const Rankings = () => {
  const data = [
    {
      name: 'Rakesh kumar',
      image: Config.banner,
      description: 'Keep supporting be best Performer',
      spark: Config.spark,
    },
    {
      name: 'Samantha Lee',
      image: Config.banner,
      description: 'Keep supporting be best Performer',
      spark: Config.spark,
    },

    {
      name: 'James Chen',
      image: Config.banner,
      description: 'Keep supporting be best Performer',
      spark: Config.spark,
    },

    {
      name: 'Aisha Patel',
      image: Config.banner,
      description: 'Keep supporting be best Performer',
      spark: Config.spark,
    },

    {
      name: 'Carlos Gomez',
      image: Config.banner,
      description: 'Keep supporting be best Performer',
      spark: Config.spark,
    },
  ];
  return (
    <ScreenTemplate className="gap-y-4">
      <Heading size="lg" type="semibold">
        All performers
      </Heading>

      <View style={tw`gap-y-4`}>
        {data.map((item, idx) => (
          <View style={tw`gap-x-4 flex-row items-center`} key={idx}>
            <Img source={item.image} className="h-16 w-16 rounded-full" />
            <View style={tw`gap-y-2`}>
              <Heading size="base">{item.name}</Heading>
              <Heading size="xs">{item.description}</Heading>
            </View>
            <Img source={Config.spark} className="h-55px w-55px ml-auto" />
          </View>
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default Rankings;
