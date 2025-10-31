import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { requestOtp } from '../../../apis';
import { loginViaPhoneSchema } from '../../../schemas';
import { showToast } from '../../../utils/constants';
import ScreenNames from '../../../utils/ScreenNames';
import { IRequestOtp } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localstorageKeys } from '../../../utils/localstorageKeys';

const useHook = (navigation: any) => {
  const initialValues = {
    phone: '',
  };
  const formProps = useFormik({
    initialValues,
    // validationSchema: loginViaPhoneSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async data => {
      const registeredDeviceId = await AsyncStorage.getItem(
        localstorageKeys.REGISTERED_DEVICE_ID,
      );
      const payload = {
        mode: 'phone',
        identifier: '+91' + data?.phone,
        registeredDeviceId: registeredDeviceId ?? '',
        type: 'customer',
      };
      navigation.navigate(ScreenNames.ENTER_OTP);
      // mutate(payload);
    },
  });
  const { mutate, variables, isPending } = useMutation({
    mutationFn: (body: IRequestOtp) => requestOtp(body),
    onSuccess: res => {
      navigation.navigate(ScreenNames.ENTER_OTP, {
        otpId: res?.id,
        phone: variables?.identifier,
      });
      showToast({
        text1: 'OTP sent!',
        type: 'success',
      });
    },
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.response?.message,
        type: 'error',
      });
    },
  });
  return { ...formProps, isPending };
};

export default useHook;
