/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { handleBackgroundMessage } from './app/utils/notifications/notificationHandler';

LogBox.ignoreAllLogs();

// Register background handler - must be called outside of any React component lifecycle
messaging().setBackgroundMessageHandler(handleBackgroundMessage);

AppRegistry.registerComponent(appName, () => App);
