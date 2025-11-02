import React from 'react';
import { View } from 'react-native';
import Button from '../../../shared/buttons';
import InputField from '../../../shared/buttons/InputField';
import Heading from '../../../shared/Heading';
import tw from '../../../utils/tailwind';
import LoginTemplate from '../LoginTemplate';
import useHook from './useHook';

const Login = ({ navigation, route }: any) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleBlur,
    errors,
    touched,
    isPending,
  } = useHook(navigation);
  const mode: 'phone' | 'email' = route.params?.mode;
  return (
    <LoginTemplate>
      <Heading size="xl">Welcome to CM 360 login</Heading>
      <View style={tw`w-full mt-10 gap-y-4`}>
        <InputField
          placeholder={
            mode === 'phone' ? 'Enter your Phone no' : 'Enter your Email ID'
          }
          label={mode === 'phone' ? 'Phone No' : 'Email ID'}
          value={values[mode]}
          onChangeText={e => setFieldValue(mode, e)}
          onBlur={handleBlur(mode)}
          keyboardType={mode === 'phone' ? 'numeric' : 'email-address'}
          errorMessage={errors?.[mode] && touched?.[mode] ? errors?.[mode] : ''}
          required
        />
        <Button
          action={handleSubmit}
          btnName="Continue"
          isLoading={isPending}
          disabled={Boolean(Object.keys(errors).length)}
        />
      </View>
    </LoginTemplate>
  );
};

export default Login;
