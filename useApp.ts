import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { registerDevice } from './app/apis';
import { showToast } from './app/utils/constants';
import { localstorageKeys } from './app/utils/localstorageKeys';

const useApp = () => {
  const [data, setData] = useState<any>({});
  const [isActive, setIsActive] = useState<boolean>(false);
  const getDeviceRegistered = async () => {
    try {
      const id = await DeviceInfo.getUniqueId();
      const res = await registerDevice({
        identifier: id,
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
        getDeviceRegistered();
      }
    };
    checkDeviceRegistered();
  }, []);
  return { data, setData, isActive, setIsActive };
};

export default useApp;
