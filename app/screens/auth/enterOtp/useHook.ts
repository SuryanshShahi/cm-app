import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { requestOtp, verifyOtp } from '../../../apis';
import { showToast } from '../../../utils/constants';
import { localstorageKeys } from '../../../utils/localstorageKeys';
import { IRequestOtp, IVerifyOtp } from '../types';
import { GlobalContext } from '../../../context';
import ScreenNames from '../../../utils/ScreenNames';
const useHook = (navigation: any, route: any) => {
  const { contact } = route.params || {};
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
      submitOtp({
        otp,
        contact,
        cmId: '550e8400-e29b-41d4-a716-446655440001',
        purpose: 'login',
      });
    } else {
      setError('');
    }
  }, [otp]);
  const { mutate: submitOtp, isPending } = useMutation({
    mutationFn: (body: IVerifyOtp) => verifyOtp(body),
    onSuccess: data => {
      if (data?.accessToken) {
        showToast({
          text1: 'OTP verified',
          type: 'success',
        });

        if (data?.isNewUser) {
          AsyncStorage.setItem(
            localstorageKeys.TEMP_TOKEN,
            JSON.stringify({
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            }),
          );
          navigation.navigate(ScreenNames.PROFILE, { userDetails: data?.user });
        } else {
          AsyncStorage.setItem(
            localstorageKeys.AUTH_TOKEN,
            JSON.stringify({
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            }),
          );
          setData(p => ({ ...p, isLoggedIn: true, userDetails: data?.user }));
        }
      } else {
        showToast({
          text1: 'Otp expired',
          type: 'error',
        });
      }
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
      setCount(30);
      showToast({
        text1: 'OTP sent successfully ' + data?.maskedOtp,
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

  return { setOtp, error, count, isPending, resendOtp, contact, submitOtp };
};

export default useHook;
