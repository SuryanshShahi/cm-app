import React from 'react';
import { Divider, Heading, Loader } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import useHook from './useHook';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';
import moment from 'moment';
import { convertDate } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../utils/ScreenNames';
const Notification = () => {
  const navigation = useNavigation<any>();
  const { isLoading, groupedData } = useHook();
  return isLoading ? (
    <Loader className="my-4" />
  ) : (
    <ScreenTemplate parentClassName="bg-white" className="gap-y-8 py-5 mb-5">
      {groupedData &&
        Object.keys(groupedData).map(date => (
          <View key={date} style={tw.style('gap-y-4')}>
            <Heading size="lg" type="semibold">
              {convertDate(date)}
            </Heading>
            {groupedData[date].map((notification, idx) => (
              <>
                <TouchableOpacity
                  style={tw.style('flex-row items-center justify-between')}
                  key={notification.id}
                  onPress={() =>
                    notification?.payload?.type === 'event_created'
                      ? navigation.navigate(ScreenNames.EVENT_DETAILS, {
                          eventId: notification?.payload?.eventId,
                        })
                      : navigation.navigate(ScreenNames.HOME_NAVIGATOR, {
                          screen: ScreenNames.POSTS,
                        })
                  }
                >
                  <View
                    key={notification.id}
                    style={tw.style('flex-row items-center gap-x-2')}
                  >
                    <View
                      style={tw.style(
                        'w-10 h-10 bg-brand/10 rounded-full justify-center items-center',
                      )}
                    >
                      <Text style={tw.style('text-brand text-lg')}>
                        {notification.title.charAt(0)}
                      </Text>
                    </View>
                    <View style={tw.style('gap-y-1')}>
                      <Heading>{notification.title}</Heading>
                      <Heading size="xs" color="secondary">
                        {notification.body}
                      </Heading>
                    </View>
                  </View>
                  <Text style={tw.style('text-tertiary text-10px')}>
                    {moment(notification.createdAt).fromNow()}
                  </Text>
                </TouchableOpacity>
                {idx !== groupedData[date].length - 1 && (
                  <Divider className="border-gray-100" />
                )}
              </>
            ))}
          </View>
        ))}
    </ScreenTemplate>
  );
};

export default Notification;
