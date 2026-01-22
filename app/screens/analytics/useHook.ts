import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '../../apis';

const useHook = () => {
  const { data, isLoading } = useQuery<{
    activitySummary: {
      leaderboardRank: number;
      postShares: number;
      votesToCM: number;
    };
    eventAttendanceGraph: {
      month: string;
      year: number;
      eventCount: number;
    }[];
    connectedSocialMedia: {
      twitter: string;
      facebook: string;
      instagram: string;
    };
  }>({
    queryKey: ['analytics'],
    queryFn: getAnalytics,
  });

  return { data, isLoading };
};

export default useHook;
