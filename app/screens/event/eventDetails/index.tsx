import React from 'react';
import { View } from 'react-native';
import Config from '../../../../assets/Config';
import { CardWrapper, Heading, Img } from '../../../shared';
import ScreenTemplate from '../../../shared/ScreenTemplate';
import tw from '../../../utils/tailwind';
import Feather from 'react-native-vector-icons/Feather';
import { AntDesign, Octicons } from '../../../utils/Icons';

const EventDetails = () => {
  return (
    <ScreenTemplate className="p-0" parentClassName="bg-white">
      <View>
        <Img source={Config.banner} className="h-200px w-full" />
        <View style={tw`absolute w-full bg-black/40 h-full justify-end p-5`}>
          <Heading
            className="p-3 rounded-lg border border-white/50 backdrop-blur-lg text-center bg-neutral-50/10"
            color="white"
            type="semibold"
          >
            Rally in Uttarakhand on 18th Sept 2025
          </Heading>
        </View>
      </View>
      <View style={tw`p-5 gap-y-4`}>
        <CardWrapper className="bg-[#FDDCC580]">
          {[
            {
              label: 'Date',
              value: 'October 22,2025',
              icon: <Feather name="calendar" size={20} />,
            },
            {
              label: 'Time',
              value: '10:00 AM - 11:00 AM',
              icon: <Feather name="clock" size={20} />,
            },
            {
              label: 'Location',
              value: 'Uttarakhand, Chambal',
              icon: <Octicons name="location" size={20} />,
            },
          ].map((item, idx) => (
            <View style={tw`flex-row gap-x-2`} key={idx}>
              <View style={tw`w-5`}>{item.icon}</View>
              <View style={tw`gap-y-2`}>
                <Heading size="xs" color="secondary">
                  {item.label}
                </Heading>
                <Heading>{item.value}</Heading>
              </View>
            </View>
          ))}
        </CardWrapper>
        <View style={tw`gap-y-2`}>
          <Heading size="lg" type="medium">
            About this event
          </Heading>
          <Heading>
            Join us for an exciting rally in Uttarakhand in 2025! This event
            promises to bring together enthusiasts from all over to celebrate
            our love for adventure and the great outdoors. Expect thrilling
            activities, inspiring speakers, and a chance to connect with
            like-minded individuals. Don't miss out on this unforgettable
            experience in the heart of the Himalayas!
          </Heading>
        </View>
        <View style={tw`gap-y-2`}>
          <Heading size="lg" type="medium">
            Location & Direction
          </Heading>
          <Heading>
            Join us for an exciting rally in Uttarakhand in 2025! This event
            promises to bring together enthusiasts from all over to celebrate
            our love for adventure and the great outdoors. Expect thrilling
            activities, inspiring speakers, and a chance to connect with
            like-minded individuals. Don't miss out on this unforgettable
            experience in the heart of the Himalayas!
          </Heading>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default EventDetails;
