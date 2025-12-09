import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import moment from 'moment';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../context';
import { profileFormSchema } from '../../../schemas';
import { IAddProfile, IUpdateProfile } from '../../profile/types';
import { updateUserProfile, uploadToS3 } from '../../../apis';
import { showToast } from '../../../utils/constants';
import ScreenNames from '../../../utils/ScreenNames';
import { useNavigation } from '@react-navigation/native';
interface IImage {
  type?: string;
  path: string;
  uri: string;
  size?: number;
  name?: string;
  width?: number;
  height?: number;
}
const useHook = () => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState('');
  const { data, setData } = useContext(GlobalContext);
  const navigation = useNavigation<any>();

  const initialValues = {
    name: '',
    dob: '',
    district: '',
    gender: '',
    phone: '',
    countryCode: '+91',
    address: '',
    photo: {} as IImage,
  };
  const formProps = useFormik({
    initialValues,
    // validationSchema: profileFormSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async data => {
      const payload = {
        fullName: data.name,
        // address: data.address,
        // district: data.district,
        // gender: data.gender,
        // dob: moment(data.dob).format('YYYY-MM-DD'),
        // phone: data.countryCode + data.phone,
        // photoMimeType: data.photo?.type,
      };
      mutate(payload as IUpdateProfile);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body: IUpdateProfile) => updateUserProfile(body),
    onSuccess: async res => {
      if (formProps.values.photo?.uri) {
        await uploadToS3(
          formProps.values.photo?.uri,
          res?.photoUploadUrl,
          formProps.values.photo?.type,
        );
      }
      showToast({
        text1: 'Profile Added Successfully',
        type: 'success',
      });
      navigation.navigate(ScreenNames.ADD_SOCIAL_ACCOUNT);
    },
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });
  return {
    ...formProps,
    isActive,
    setIsActive,
    isOpen,
    setIsOpen,
    initialValues,
    isPending,
  };
};

export default useHook;
