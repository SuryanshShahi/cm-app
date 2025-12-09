import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import moment from 'moment';
import { useCallback, useContext, useState } from 'react';
import { getUserProfile, updateUserProfile, uploadToS3 } from '../../apis';
import { GlobalContext } from '../../context';
import { IUserDetails } from '../../context/types';
import { profileFormSchema } from '../../schemas';
import { showToast } from '../../utils/constants';
import { IUpdateProfile } from './types';
import { useFocusEffect } from '@react-navigation/native';
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
  const { setData } = useContext(GlobalContext);

  const { data: userDetails, refetch } = useQuery<IUserDetails>({
    queryKey: ['userDetails'],
    queryFn: getUserProfile,
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );
  const initialValues = {
    name: userDetails?.name ?? '',
    dob: userDetails?.dob ? moment(userDetails?.dob).format('YYYY-MM-DD') : '',
    gender: userDetails?.gender ?? '',
    address: userDetails?.address ?? '',
    city: userDetails?.city ?? '',
    workingSince: userDetails?.workingWithPartySince
      ? moment(userDetails?.workingWithPartySince).format('YYYY-MM-DD')
      : '',
    identifier: userDetails?.aadhaarNumber ?? '',
    photo: {} as IImage,
  };
  const formProps = useFormik({
    initialValues,
    validationSchema: profileFormSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async data => {
      const payload = {
        fullName: data.name,
        workingWithPartySince: moment(data.workingSince).format('YYYY-MM-DD'),
        address: data.address,
        aadhaarNumber: data.identifier,
        city: data.city,
        gender: data.gender,
        dob: moment(data.dob).format('YYYY-MM-DD'),
        photoMimeType: data.photo?.type,
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
      const userDetails = await getUserProfile();
      setData(p => ({ ...p, userDetails }));
      showToast({
        text1: 'Profile Updated Successfully',
        type: 'success',
      });
      setIsActive(false);
    },
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });
  return {
    ...formProps,
    userDetails,
    isActive,
    setIsActive,
    isOpen,
    setIsOpen,
    initialValues,
    isPending,
  };
};

export default useHook;
