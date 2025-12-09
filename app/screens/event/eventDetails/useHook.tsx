import { useQuery } from '@tanstack/react-query';
import { getEventById } from '../../../apis';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IEvent } from '../useHook';

const useHook = () => {
  const { eventId } =
    useRoute<RouteProp<{ params: { eventId: string } }>>().params;
  console.log('🚀 ~ useHook ~ eventId:', eventId);
  const { data: eventDetail } = useQuery<IEvent>({
    queryKey: ['eventDetail', eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });
  return { eventDetail };
};

export default useHook;
