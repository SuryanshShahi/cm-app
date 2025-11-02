import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '../../apis';

const useHook = () => {
  const { data } = useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
  });
  console.log('🚀 ~ useHook ~ data:', data);

  return {};
};

export default useHook;
