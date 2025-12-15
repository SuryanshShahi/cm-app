import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '../../apis';

const useHook = () => {
  const { data } = useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
  });

  return {};
};

export default useHook;
