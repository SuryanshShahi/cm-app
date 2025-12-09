import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {registerDevice} from '../../apis';
import {localstorageKeys} from '../localstorageKeys';

export async function requestUserPermission() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    const token = await getFCMToken();
    if (token) {
      const id = await DeviceInfo.getUniqueId();
      await registerDevice({
        deviceId: id,
        fcmToken: token,
        platform: Platform.OS,
      });
    }
    return token;
  }
  return null;
}

export const getFCMToken = async () => {
  let token = await AsyncStorage.getItem(localstorageKeys.FCM_TOKEN);
  if (!token) {
    const notificationToken = await messaging().getToken();
    if (notificationToken) {
      await AsyncStorage.setItem(localstorageKeys.FCM_TOKEN, notificationToken);
      return notificationToken;
    }
  }
  return token;
};

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {});

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {});
};
