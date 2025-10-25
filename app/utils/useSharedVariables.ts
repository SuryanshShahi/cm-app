import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { localstorageKeys } from './localstorageKeys';

const useSharedVariables = () => {
  const [details, setDetails] = useState<{
    registeredDeviceId: string | null;
    customerToken: string | null;
    deviceId: string | null;
  }>({
    registeredDeviceId: '',
    customerToken: '',
    deviceId: '',
  });
  useEffect(() => {
    const getDetails = async () => {
      const registeredDeviceId = await AsyncStorage.getItem(
        localstorageKeys.REGISTERED_DEVICE_ID,
      );
      const customerToken = await AsyncStorage.getItem(
        localstorageKeys.AUTH_TOKEN,
      );
      const id = await DeviceInfo.getUniqueId();
      setDetails({ registeredDeviceId, customerToken, deviceId: id });
    };
    getDetails();
  }, []);

  return { ...details };
};

export default useSharedVariables;
