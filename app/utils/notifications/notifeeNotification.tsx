import notifee, { AndroidImportance } from '@notifee/react-native';
import { DEFAULT_CHANNEL_ID } from './constants';

export interface NotificationData {
  title?: string;
  body?: string;
  message?: string;
  data?: any;
  notification?: {
    title?: string;
    body?: string;
  };
}

/**
 * Display notification using Notifee
 * @param notificationData - Notification data object with title, body/message, and optional data
 */
export async function onDisplayNotification(
  notificationData: NotificationData,
) {
  // Request notification permissions
  await notifee.requestPermission({
    alert: true,
    badge: true,
    sound: true,
  });

  // Use default channel
  const selectedChannelId = DEFAULT_CHANNEL_ID;

  // Create notification channel
  await notifee.createChannel({
    id: selectedChannelId,
    name: 'General Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
    vibrationPattern: [300, 500],
  });

  // Extract notification title and body
  const notificationTitle =
    notificationData?.notification?.title ||
    notificationData?.title ||
    'Notification';
  const notificationBody =
    notificationData?.notification?.body ||
    notificationData?.body ||
    notificationData?.message ||
    'You have a new notification';

  // Display the notification
  try {
    await notifee.displayNotification({
      title: notificationTitle,
      body: notificationBody,
      data: notificationData?.data || notificationData || {},

      android: {
        channelId: selectedChannelId,
        smallIcon: 'notification_icon', // Make sure this icon exists in android/app/src/main/res/drawable
        pressAction: {
          id: 'default',
        },
        importance: AndroidImportance.HIGH,
      },

      // iOS configuration (uncomment and configure if needed)
      // ios: {
      //   sound: 'default',
      //   foregroundPresentationOptions: {
      //     alert: true,
      //     badge: true,
      //     sound: true,
      //   },
      // },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}
