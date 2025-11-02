import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getEvents } from '../../apis';

const useHook = () => {
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
  return { events };
};

export default useHook;
