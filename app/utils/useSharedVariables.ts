import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { localstorageKeys } from './localstorageKeys';

const useSharedVariables = () => {
  const [details, setDetails] = useState<{
    registeredDeviceId: string | null;
    authToken: string | null;
    tempToken: string | null;
    deviceId: string | null;
    isLoading: boolean;
  }>({
    registeredDeviceId: '',
    authToken: '',
    tempToken: '',
    deviceId: '',
    isLoading: true,
  });
  useEffect(() => {
    const getDetails = async () => {
      const registeredDeviceId = await AsyncStorage.getItem(
        localstorageKeys.REGISTERED_DEVICE_ID,
      );
      const authToken = await AsyncStorage.getItem(localstorageKeys.AUTH_TOKEN);
      const tempToken = await AsyncStorage.getItem(localstorageKeys.TEMP_TOKEN);
      const deviceId = await DeviceInfo.getUniqueId();
      setDetails({
        registeredDeviceId,
        authToken,
        deviceId,
        tempToken,
        isLoading: false,
      });
    };
    getDetails();
  }, []);

  return { ...details };
};

export default useSharedVariables;
