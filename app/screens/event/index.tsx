import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Config from '../../../assets/Config';
import { Button, CardWrapper, FormControl, Heading, Img } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { convertDate } from '../../utils/constants';
import { Octicons } from '../../utils/Icons';
import ScreenNames from '../../utils/ScreenNames';
import tw from '../../utils/tailwind';
import useHook, { IEvent } from './useHook';
import EmptyState from '../../shared/EmptyState';

const Event = ({ navigation }: any) => {
  const { eventsByDate, selectedDate, setSelectedDate, handleRsvp } = useHook();
  const slidePosition = useSharedValue(0);
  const buttonPositions = useRef<number[]>([]);

  useEffect(() => {
    const selectedIndex = Array.from({ length: 7 }).findIndex((_, idx) => {
      const day = moment().startOf('isoWeek').add(idx, 'days');
      return day.isSame(selectedDate, 'day');
    });

    if (
      selectedIndex !== -1 &&
      buttonPositions.current[selectedIndex] !== undefined
    ) {
      slidePosition.value = withSpring(buttonPositions.current[selectedIndex], {
        damping: 40,
        stiffness: 200,
      });
    }
  }, [selectedDate]);

  const currentEvent: Partial<IEvent> = (() => {
    const now = moment();
    const sortedDates = Object.keys(eventsByDate).sort((a, b) =>
      moment(a).diff(moment(b)),
    );

    for (const date of sortedDates) {
      const events = eventsByDate[date] || [];
      for (const event of events) {
        const startTime =
          event.rescheduledStartTime || event.scheduledStartTime;
        if (startTime && moment(startTime).isAfter(now)) {
          return event;
        }
      }
    }
    return {};
  })();
  console.log('🚀 ~ Event ~ currentEvent:', eventsByDate);

  return (
    <ScreenTemplate className="gap-y-4" parentClassName="bg-white">
      <Heading size="xl" type="semibold">
        Events & Participation
      </Heading>
      <View>
        <Img source={Config.banner} className="h-200px w-full rounded-xl" />
        {Object.keys(eventsByDate).length > 0 && (
          <View
            style={tw`absolute bg-black/50 h-full w-full items-center justify-center gap-y-2 rounded-xl`}
          >
            <Heading
              size="base"
              type="semibold"
              className="text-center"
              color="white"
            >
              Event in Uttarakhand on{' '}
              {convertDate(currentEvent.scheduledStartTime)}
            </Heading>

            {currentEvent.isAttending ? (
              <Button
                btnName="Attending"
                className="h-9 bg-green-600 border-green-600"
                styleBtnName="text-sm"
                icon={<Octicons name="check-circle" size={14} color="white" />}
              />
            ) : currentEvent.isRejected ? (
              <Button
                btnName="Not Attending"
                className="h-9 bg-red-600 border-red-600"
                styleBtnName="text-sm"
                icon={<Octicons name="x-circle" size={14} color="white" />}
              />
            ) : (
              <>
                <Heading size="sm" className="text-center" color="white">
                  Are you Willing to Attend ?
                </Heading>
                <View style={tw`flex-row gap-x-6`}>
                  <Button
                    btnName="No"
                    className="px-5 h-9 bg-red-600 border-red-600"
                    action={() =>
                      currentEvent.id &&
                      handleRsvp({
                        eventId: currentEvent.id,
                        body: { isAttending: false },
                      })
                    }
                  />
                  <Button
                    btnName="Yes"
                    className="px-5 h-9 bg-green-600 border-green-600"
                    action={() =>
                      currentEvent.id &&
                      handleRsvp({
                        eventId: currentEvent.id,
                        body: { isAttending: true },
                      })
                    }
                  />
                </View>
              </>
            )}
          </View>
        )}
      </View>
      <Heading size="xl" type="semibold">
        {moment().format('MMMM YYYY')}
      </Heading>
      <View style={tw`flex-row justify-between relative`}>
        <Animated.View
          style={[
            tw`absolute bg-brand rounded-lg`,
            {
              width: 44,
              top: 0,
              bottom: 0,
              zIndex: 0,
            },
            useAnimatedStyle(() => {
              return {
                transform: [{ translateX: slidePosition.value }],
              };
            }),
          ]}
        />
        {Array.from({ length: 7 }).map((_, idx) => {
          const day = moment().startOf('isoWeek').add(idx, 'days');
          const isSelected = day.isSame(selectedDate, 'day');
          return (
            <View
              key={idx}
              style={{ zIndex: 1 }}
              onLayout={(e: LayoutChangeEvent) => {
                buttonPositions.current[idx] = e.nativeEvent.layout.x;
                if (isSelected) {
                  slidePosition.value = withSpring(e.nativeEvent.layout.x, {
                    damping: 40,
                    stiffness: 200,
                  });
                }
              }}
            >
              <Button
                className="flex-col w-11 h-auto px-0 py-2 gap-y-2 border-transparent bg-transparent"
                variant="outlined"
                action={() => setSelectedDate(day.format('YYYY-MM-DD'))}
              >
                <Heading color={isSelected ? 'white' : 'black'}>
                  {day.format('ddd')}
                </Heading>
                <Heading color={isSelected ? 'white' : 'black'} size="2xl">
                  {day.format('D')}
                </Heading>
              </Button>
            </View>
          );
        })}
      </View>

      {eventsByDate[selectedDate]?.length ? (
        <View style={tw`gap-y-4`}>
          <Heading size="xl" type="semibold">
            Upcoming Events
          </Heading>
          {eventsByDate[selectedDate]?.map((item, eventIdx) => (
            <CardWrapper
              className="flex-row justify-between items-center bg-gray-100 gap-x-4"
              key={`${item.title}-${eventIdx}`}
            >
              <View style={tw`flex-row gap-x-4 items-center flex-1`}>
                <FormControl onPress={() => {}} type="radio" selected />
                <View style={tw`gap-y-2 flex-1`}>
                  <Heading size="base">{item.title}</Heading>
                  <Heading size="xs" numberOfLines={1}>
                    {item.description}
                  </Heading>
                </View>
              </View>
              <Button
                btnName="View Details"
                className="h-8"
                styleBtnName="text-sm"
                action={() =>
                  navigation.navigate(ScreenNames.EVENT_DETAILS, {
                    eventId: item.id,
                  })
                }
              />
            </CardWrapper>
          ))}
        </View>
      ) : (
        <EmptyState
          title="No Events Found"
          description="No Events Scheduled for this date"
        />
      )}
    </ScreenTemplate>
  );
};

export default Event;
