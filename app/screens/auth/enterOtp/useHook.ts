import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { requestOtp, verifyOtp } from '../../../apis';
import { showToast } from '../../../utils/constants';
import { localstorageKeys } from '../../../utils/localstorageKeys';
import { IRequestOtp, IVerifyOtp } from '../types';
import { GlobalContext } from '../../../context';
const useHook = (navigation: any, route: any) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [count, setCount] = useState(30);
  const { setData } = useContext(GlobalContext);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev: number) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (otp?.length === 6) {
      submitOtp({ otp, otpId: route?.params?.otpId, mode: 'phone' });
    } else {
      setError('');
    }
  }, [otp]);
  const { mutate: submitOtp, isPending } = useMutation({
    mutationFn: (body: IVerifyOtp) => verifyOtp(body),
    onSuccess: data => {
      showToast({
        text1: 'OTP verified',
        type: 'success',
      });
      AsyncStorage.setItem(localstorageKeys.AUTH_TOKEN, JSON.stringify(data));
      setData(p => ({ ...p, isLoggedIn: true }));
    },
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });
  const { mutate: resendOtp } = useMutation({
    mutationFn: (body: IRequestOtp) => requestOtp(body),
    onSuccess: data => {
      setOtp('');
      showToast({
        text1: 'OTP sent successfully',
        type: 'success',
      });
      navigation.setParams({ otpId: data?.otpId });
    },
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });

  return { setOtp, error, count, isPending, resendOtp };
};

export default useHook;
