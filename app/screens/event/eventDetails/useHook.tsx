import { useQuery } from '@tanstack/react-query';
import { getEventById } from '../../../apis';

const useHook = () => {
  const { data: eventDetail } = useQuery({
    queryKey: ['eventDetail'],
    queryFn: () => getEventById(''),
  });
  return { eventDetail };
};

export default useHook;
