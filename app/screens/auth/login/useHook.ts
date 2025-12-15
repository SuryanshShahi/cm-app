import { useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { requestOtp } from '../../../apis';
import { loginSchema } from '../../../schemas';
import { showToast } from '../../../utils/constants';
import ScreenNames from '../../../utils/ScreenNames';
import { IRequestOtp } from '../types';

const useHook = (navigation: any) => {
  const route = useRoute<any>();
  const initialValues = {
    email: '',
    phone: '',
    countryCode: '+91',
  };
  const formProps = useFormik({
    initialValues,
    validationSchema: loginSchema(route.params?.mode),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async data => {
      const payload = {
        contact:
          route.params?.mode === 'phone'
            ? data.countryCode + data.phone
            : data.email,
        cmId: '550e8400-e29b-41d4-a716-446655440001',
        purpose: 'login',
      };
      mutate(payload);
    },
  });
  const { mutate, variables, isPending } = useMutation({
    mutationFn: (body: IRequestOtp) => requestOtp(body),
    onSuccess: (res: { maskedOtp: string }) => {
      navigation.navigate(ScreenNames.ENTER_OTP, {
        contact: variables?.contact,
        mode: route.params?.mode,
      });
      showToast({
        text1: 'OTP sent! ' + res?.maskedOtp,
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
