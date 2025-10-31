import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Config from '../../../../assets/Config';
import { Img } from '../../../shared';
import Button from '../../../shared/buttons';
import InputField from '../../../shared/buttons/InputField';
import Heading from '../../../shared/Heading';
import tw from '../../../utils/tailwind';
import useHook from './useHook';
import LoginTemplate from '../LoginTemplate';

const LoginViaPhone = ({ navigation }: any) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleBlur,
    errors,
    touched,
    isPending,
  } = useHook(navigation);
  return (
    <LoginTemplate>
      <Heading size="xl">Welcome to CM 360 login</Heading>
      <View style={tw`w-full mt-10 gap-y-4`}>
        <InputField
          placeholder="Enter your Phone no / Email ID"
          label="Phone No / Email ID"
          value={values?.phone}
          onChangeText={(e: string) => {
            setFieldValue('phone', e);
          }}
          onBlur={handleBlur('phone')}
          keyboardType="numeric"
          wrapperClassName="w-full"
          // errorMessage={errors?.phone && touched?.phone ? errors?.phone : ''}
        />
        <Button
          action={handleSubmit}
          btnName="Continue"
          isLoading={isPending}
        />
      </View>
    </LoginTemplate>
  );
};

export default LoginViaPhone;
