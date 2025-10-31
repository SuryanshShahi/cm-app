import { useFormik } from 'formik';

const useHook = () => {
  const initialValues = {
    phone: '',
  };
  const formProps = useFormik({
    initialValues,
    // validationSchema: loginViaPhoneSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async data => {},
  });

  return { ...formProps };
};

export default useHook;
