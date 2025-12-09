import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getUserProfile, registerDevice } from './app/apis';
import { localstorageKeys } from './app/utils/localstorageKeys';
import DeviceInfo from 'react-native-device-info';
import { showToast } from './app/utils/constants';
import { Platform } from 'react-native';
import { requestUserPermission } from './app/utils/notifications/notificationServices';

export interface IRegisterDevice {
  deviceId: string;
  fcmToken: string;
  platform: string;
}
const useApp = () => {
  const [data, setData] = useState<any>({});
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  const checkIfLoggedIn = async () => {
    setIsLoading(true);
    const item = await AsyncStorage.getItem(localstorageKeys.AUTH_TOKEN);
    if (item) {
      const userDetails = await getUserProfile();
      setData({ ...data, userDetails, isLoggedIn: true });
    } else {
      setData({ ...data, isLoggedIn: false });
    }
    setIsLoading(false);
  };
  const getDeviceRegistered = async () => {
    try {
      const id = await DeviceInfo.getUniqueId();
      const res = await registerDevice({
        deviceId: id,
        platform: Platform.OS,
      });
      if (res?.id) {
        AsyncStorage.setItem(localstorageKeys.REGISTERED_DEVICE_ID, res?.id);
      }
    } catch (err: any) {
      showToast({
        text1: err?.response?.data?.response?.message ?? '',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    const checkDeviceRegistered = async () => {
      const registeredDeviceId = await AsyncStorage.getItem(
        localstorageKeys.REGISTERED_DEVICE_ID,
      );
      if (!registeredDeviceId) {
        const id = await DeviceInfo.getUniqueId();
        const res = await registerDevice({
          deviceId: id,
          platform: Platform.OS,
        });
        if (res?.id) {
          AsyncStorage.setItem(localstorageKeys.REGISTERED_DEVICE_ID, res?.id);
          const token = await requestUserPermission();
          if (token) {
            await registerDevice({
              deviceId: id,
              platform: Platform.OS,
              fcmToken: token,
            });
          }
          setData((p: any) => ({
            ...p,
            registeredDeviceId: res?.id,
            fcmToken: token,
            deviceId: id,
          }));
        } else {
          const fcmToken = await AsyncStorage.getItem(
            localstorageKeys.FCM_TOKEN,
          );
          if (!fcmToken) {
            const newToken = await requestUserPermission();
            setData((p: any) => ({
              ...p,
              fcmToken: newToken,
              deviceId: id,
              registeredDeviceId: res?.id,
            }));
          }
        }
      }
    };
    checkDeviceRegistered();
  }, []);
  return { data, setData, isActive, setIsActive, isLoading };
};

export default useApp;
