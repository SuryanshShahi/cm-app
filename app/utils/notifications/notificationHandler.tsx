import messaging from '@react-native-firebase/messaging';
import { QueryClient } from '@tanstack/react-query';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { DEFAULT_CHANNEL_ID } from './constants';
import { NotificationData, onDisplayNotification } from './notifeeNotification';

/**
 * Foreground notification handler
 * Called when app is in foreground and receives a notification
 */
export const foregroundNotification = async (queryClient: QueryClient) => {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification received:', remoteMessage);

    // Handle notification data
    const notificationData: NotificationData = {
      title: remoteMessage.notification?.title as string,
      body: remoteMessage.notification?.body as string,
      data: remoteMessage.data as any,
    };

    // Display notification using notifee
    await onDisplayNotification(notificationData);

    // Invalidate queries if needed
    if (remoteMessage.data?.type) {
      queryClient?.invalidateQueries({ queryKey: [remoteMessage.data.type] });
    }
  });
};

/**
 * Background message handler
 * Called when app is in background/terminated and receives a notification
 * Must be registered in index.js
 */
export const handleBackgroundMessage = async (remoteMessage: any) => {
  console.log('Background notification received:', remoteMessage);

  const notificationData: NotificationData = {
    title: remoteMessage.notification?.title as string,
    body: remoteMessage.notification?.body as string,
    data: remoteMessage.data as any,
  };
  const selectedChannelId = DEFAULT_CHANNEL_ID;
  const channelName = 'General Notifications';

  // Create notification channel
  await notifee.createChannel({
    id: selectedChannelId,
    name: channelName,
    sound: 'default',
    vibration: true,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  });

  // Prepare notification title and body
  const notificationTitle =
    remoteMessage.notification?.title ||
    remoteMessage.data?.title ||
    'Notification';
  const notificationBody =
    remoteMessage.notification?.body ||
    remoteMessage.data?.body ||
    'You have a new notification';

  // Display notification
  await notifee.displayNotification({
    title: notificationTitle,
    body: notificationBody,
    data: remoteMessage.data || {},
    android: {
      channelId: selectedChannelId,
      smallIcon: 'notification_icon', // Make sure this icon exists in android/app/src/main/res/drawable
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
      importance: AndroidImportance.HIGH,
    },
  });
};
