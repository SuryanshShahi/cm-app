import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { DEFAULT_CHANNEL_ID } from './constants';
import { staticNavigation, navigationRef } from '../StaticNavigation';
import ScreenNames from '../ScreenNames';

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

  try {
    await notifee.displayNotification({
      title: notificationData?.title,
      body: notificationData?.body || notificationData?.message,
      data: notificationData?.data || {},

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

/**
 * Handle navigation based on notification data
 * @param type - Notification type (e.g., 'post_created', 'event_created')
 * @param eventId - Optional event ID for event-related notifications
 */
const handleRedirection = (data: any) => {
  if (!data.type) return null;

  switch (data.type) {
    case 'post_created':
      return { screen: ScreenNames.POSTS, params: {} };
    case 'event_created':
      return {
        screen: ScreenNames.EVENT_DETAILS,
        params: { eventId: data.eventId },
      };
    default:
      return null;
  }
};

/**
 * Navigate based on notification data
 * @param data - Notification data containing type and optional eventId
 */
export const navigateFromNotification = (data: any) => {
  if (!data || !data.type) return;

  const navigation = handleRedirection(data);
  if (navigation) {
    // Wait for navigation to be ready
    const checkNavigation = () => {
      if (staticNavigation && navigationRef.isReady()) {
        staticNavigation.navigate(navigation.screen, navigation.params);
      }
    };

    // Try immediately, then retry if navigation not ready
    checkNavigation();
    setTimeout(checkNavigation, 500);
    setTimeout(checkNavigation, 1000);
  }
};

/**
 * Set up Notifee foreground event listener
 * Handles notification press when app is in foreground
 */
export function setupNotifeeForegroundHandler() {
  return notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        // Handle navigation when notification is pressed
        if (detail.notification?.data) {
          navigateFromNotification(detail.notification.data);
        }
        break;
      case EventType.ACTION_PRESS:
        console.log('User pressed notification action', detail.notification);
        // Handle action button press if needed
        if (detail.notification?.data) {
          navigateFromNotification(detail.notification.data);
        }
        break;
    }
  });
}

/**
 * Check for initial notification when app is opened from terminated state
 * Should be called when app initializes
 */
export async function checkInitialNotifeeNotification() {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log('Initial notification:', initialNotification);
    if (initialNotification.notification?.data) {
      navigateFromNotification(initialNotification.notification.data);
    }
  }
}

/**
 * Background event handler for Notifee
 * Must be registered in index.js
 * This handles notifications when app is in background state
 */
export async function handleNotifeeBackgroundEvent({ type, detail }: any) {
  switch (type) {
    case EventType.PRESS:
      console.log(
        'User pressed notification in background',
        detail.notification,
      );
      // When app comes to foreground, navigation will be handled by checkInitialNotifeeNotification
      // or the foreground handler will catch it
      break;
    case EventType.ACTION_PRESS:
      console.log(
        'User pressed notification action in background',
        detail.notification,
      );
      break;
  }
}
