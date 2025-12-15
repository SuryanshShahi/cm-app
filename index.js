/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
import { handleBackgroundMessage } from './app/utils/notifications/notificationHandler';
import { handleNotifeeBackgroundEvent } from './app/utils/notifications/notifeeNotification';

LogBox.ignoreAllLogs();

// Register background handler - must be called outside of any React component lifecycle
messaging().setBackgroundMessageHandler(handleBackgroundMessage);

// Register Notifee background event handler
// This handles notification clicks when app is in background state
notifee.onBackgroundEvent(handleNotifeeBackgroundEvent);

AppRegistry.registerComponent(appName, () => App);
