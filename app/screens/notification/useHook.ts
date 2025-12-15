import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getNotifications } from '../../apis';
export interface INotification {
  notifications: [
    {
      _id: string;
      title: string;
      body: string;
      payload: any;
      topics: string[];
      createdAt: string;
      expiryAt: string;
      meta: any;
    },
  ];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
const useHook = () => {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useQuery<INotification>({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });
  const data = notifications?.notifications.map(notification => ({
    id: notification._id,
    title: notification.title,
    body: notification.body,
    payload: notification.payload,
    topics: notification.topics,
    createdAt: notification.createdAt,
    expiryAt: notification.expiryAt,
  }));

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const groupedData = data?.reduce((acc, notification) => {
    const date = new Date(notification.createdAt);
    const dateKey = date.toISOString().split('T')[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(notification);
    return acc;
  }, {} as Record<string, typeof data>);

  if (groupedData) {
    Object.keys(groupedData).forEach(dateKey => {
      groupedData[dateKey].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    });
  }

  return { isLoading, groupedData };
};

export default useHook;
