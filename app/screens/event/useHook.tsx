import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { getEvents, rsvpEvent } from '../../apis';
import { showToast } from '../../utils/constants';
export interface IEvent {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  rescheduledStartTime: string | null;
  rescheduledEndTime: string | null;
  type: string;
  banner: string | null;
  location: string;
  googlePlaceId: string;
  status: string;
  totalAttendees: number;
  isAttending: boolean;
  isRejected: boolean;
}
const useHook = () => {
  const [selectedDate, setSelectedDate] = useState('');
  useEffect(() => {
    setSelectedDate(moment().format('YYYY-MM-DD'));
  }, []);
  const { data: events, refetch } = useQuery<{ events: IEvent[] }>({
    queryKey: ['events'],
    queryFn: () =>
      getEvents(
        1,
        20,
        'published',
        '',
        moment().startOf('week').toISOString(),
        moment().endOf('week').toISOString(),
      ),
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );
  const eventList: IEvent[] = events?.events ?? [];

  const eventsByDate: Record<string, IEvent[]> = eventList.reduce(
    (acc, evt) => {
      const dateKey = moment(evt.scheduledStartTime).format('YYYY-MM-DD');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(evt);
      return acc;
    },
    {} as Record<string, IEvent[]>,
  );
  const { mutate: handleRsvp, isPending } = useMutation({
    mutationFn: (payload: {
      eventId: string;
      body: { isAttending: boolean };
    }) => rsvpEvent(payload.eventId, payload.body),
    onSuccess: () => {
      showToast({
        text1: 'RSVP successful',
        type: 'success',
      });
    },
    onError: () => {
      showToast({
        text1: 'Failed to RSVP to event',
      });
    },
  });
  return {
    events: eventList,
    eventsByDate,
    selectedDate,
    setSelectedDate,
    handleRsvp,
    isPending,
  };
};

export default useHook;
