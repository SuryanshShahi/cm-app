import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getUserProfile, registerDevice } from './app/apis';
import { localstorageKeys } from './app/utils/localstorageKeys';
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

  useEffect(() => {
    const checkDeviceRegistered = async () => {
      const registeredDeviceId = await AsyncStorage.getItem(
        localstorageKeys.REGISTERED_DEVICE_ID,
      );

      const id = await DeviceInfo.getUniqueId();
      const token = await requestUserPermission();
      if (!registeredDeviceId) {
        if (token) {
          const res = await registerDevice({
            deviceId: id,
            platform: Platform.OS,
            fcmToken: token,
          });
          AsyncStorage.setItem(localstorageKeys.REGISTERED_DEVICE_ID, res?.id);

          setData((p: any) => ({
            ...p,
            registeredDeviceId: res?.id,
            fcmToken: token,
            deviceId: id,
          }));
        }
      } else {
        setData((p: any) => ({
          ...p,
          registeredDeviceId: registeredDeviceId,
          fcmToken: token,
          deviceId: id,
        }));
      }
    };
    checkDeviceRegistered();
  }, []);
  return { data, setData, isActive, setIsActive, isLoading };
};

export default useApp;
