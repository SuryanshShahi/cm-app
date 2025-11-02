import React from 'react';
import { View } from 'react-native';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { Button, CardWrapper, FormControl, Heading, Img } from '../../shared';
import Config from '../../../assets/Config';
import tw from '../../utils/tailwind';
import moment from 'moment';
import ScreenNames from '../../utils/ScreenNames';
import useHook from './useHook';

const Event = ({ navigation }: any) => {
  const { events } = useHook();
  console.log('🚀 ~ Event ~ events:', events);
  const data: Record<
    'ongoing' | 'upcoming',
    { title: string; events: { title: string; subtitle: string }[] }
  > = {
    ongoing: {
      title: 'Events Based on Calendar',
      events: [
        {
          title: 'Rally in Uttarakhand',
          subtitle: 'At 4 PM in Chambal',
        },
        {
          title: 'Rally in Uttarakhand',
          subtitle: 'At 4 PM in Chambal',
        },
      ],
    },
    upcoming: {
      title: 'Upcoming Events',
      events: [
        {
          title: 'Rally in Uttarakhand',
          subtitle: 'At 4 PM in Chambal',
        },
        {
          title: 'Rally in Uttarakhand',
          subtitle: 'At 4 PM in Chambal',
        },
      ],
    },
  };
  return (
    <ScreenTemplate className="gap-y-4" parentClassName="bg-white">
      <Heading size="xl" type="semibold">
        Events & Participation
      </Heading>
      <View>
        <Img source={Config.banner} className="h-200px w-full rounded-xl" />
        <View
          style={tw`absolute bg-black/40 h-full w-full items-center justify-center gap-y-2 rounded-xl`}
        >
          <Heading
            size="base"
            type="semibold"
            className="text-center"
            color="white"
          >
            Rally in Uttarakhand on 18th Sept 2025
          </Heading>
          <Heading size="sm" className="text-center" color="white">
            Are you Willing to Attend ?
          </Heading>
          <View style={tw`flex-row gap-x-6`}>
            <Button
              btnName="No"
              className="px-5 h-9 bg-red-600 border-red-600"
            />
            <Button
              btnName="Yes"
              className="px-5 h-9 bg-green-600 border-green-600"
            />
          </View>
        </View>
      </View>
      <Heading size="xl" type="semibold">
        {moment().format('MMMM YYYY')}
      </Heading>
      <View style={tw`flex-row justify-between`}>
        {Array.from({ length: 7 }).map((_, idx) => {
          const day = moment().startOf('isoWeek').add(idx, 'days');
          const isToday = day.isSame(moment(), 'day');
          return (
            <Button
              className={`flex-col w-11 h-auto px-0 py-2 gap-y-2 ${
                !isToday && 'border-transparent'
              }`}
              variant={isToday ? 'brand' : 'outlined'}
              key={idx}
            >
              <Heading color={isToday ? 'white' : 'black'}>
                {day.format('ddd')}
              </Heading>
              <Heading color={isToday ? 'white' : 'black'} size="2xl">
                {day.format('D')}
              </Heading>
            </Button>
          );
        })}
      </View>

      {(Object.keys(data) as Array<keyof typeof data>).map(sectionKey => (
        <View style={tw`gap-y-4`} key={sectionKey}>
          <Heading size="xl" type="semibold">
            {data[sectionKey]?.title}
          </Heading>
          {data[sectionKey]?.events?.map(
            (item: { title: string; subtitle: string }, eventIdx: number) => (
              <CardWrapper
                className="flex-row justify-between items-center bg-gray-100"
                key={`${sectionKey}-${eventIdx}`}
              >
                <View style={tw`flex-row gap-x-4 items-center`}>
                  <FormControl onPress={() => {}} type="radio" selected />
                  <View style={tw`gap-y-2`}>
                    <Heading size="base">{item.title}</Heading>
                    <Heading size="xs">{item.subtitle}</Heading>
                  </View>
                </View>
                <Button
                  btnName="View Details"
                  className="h-8"
                  styleBtnName="text-sm"
                  action={() => navigation.navigate(ScreenNames.EVENT_DETAILS)}
                />
              </CardWrapper>
            ),
          )}
        </View>
      ))}
    </ScreenTemplate>
  );
};

export default Event;
