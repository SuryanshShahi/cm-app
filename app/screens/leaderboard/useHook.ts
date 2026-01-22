import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../../apis';
export interface ILeaderboard {
  userId: string;
  userName: string;
  totalShares: number;
  reachEnhanced: number;
  rank: number;
  photoUrl: string;
}

const useHook = () => {
  const { data, isLoading } = useQuery<{ leaderboard: ILeaderboard[] }>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
  });
  console.log('🚀 ~ useHook ~ data:', data);
  const leaderboard = data?.leaderboard?.map((item, index) => ({
    id: item.userId,
    image: item.photoUrl,
    description: 'Keep supporting be best Performer',
    name: item.userName,
    rank: item.rank,
  }));
  return { leaderboard, isLoading };
};

export default useHook;
