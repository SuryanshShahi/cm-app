import React, { useState } from 'react';
import { SceneMap } from 'react-native-tab-view';
import NavTabBar from '../../shared/NavTabBar';
import TopPerformers from './TopPerformers';
import Rankings from './Rankings';
import useHook from './useHook';

const Leaderboard = () => {
  const { leaderboard, isLoading } = useHook();
  const renderScene = SceneMap({
    topPerformer: () => <TopPerformers data={leaderboard?.slice(0, 5) || []} />,
    ranking: () => <Rankings data={leaderboard || []} />,
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'topPerformer', title: 'Top Performers', value: 'topPerformer' },
    { key: 'ranking', title: 'Leaderboard', value: 'ranking' },
  ]);
  return (
    <NavTabBar
      routes={routes}
      renderScene={renderScene}
      index={index}
      setIndex={setIndex}
    />
  );
};

export default Leaderboard;
