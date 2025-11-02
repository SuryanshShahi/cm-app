import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context';
import { profileFormSchema } from '../../schemas';

const useHook = () => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState('');
  const { data } = useContext(GlobalContext);

  const initialValues = {
    name: data?.userDetails?.name ?? '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    workingSince: '',
    identifier: data?.userDetails?.aadhaarNumber ?? '',
    profileUrl: '',
  };
  const formProps = useFormik({
    initialValues,
    validationSchema: profileFormSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async data => {
      const payload = {};
      //   mutate(payload);
    },
  });
  return {
    ...formProps,
    userDetails: data?.userDetails,
    isActive,
    setIsActive,
    isOpen,
    setIsOpen,
    initialValues,
  };
};

export default useHook;
