import React from 'react';
import { View } from 'react-native';
import Button from '../../../shared/buttons';
import CardWrapper from '../../../shared/cards/CardWrapper';
import Heading from '../../../shared/Heading';
import tw from '../../../utils/tailwind';
import useHook from './useHook';
import InputField from '../../../shared/buttons/InputField';

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
    <>
      <View style={tw`gap-y-4`}>
        <Heading size="xl">Merchant Login</Heading>
        <CardWrapper>
          <InputField
            placeholder="Enter Phone Number"
            label="Phone Number"
            value={values?.phone}
            onChangeText={(e: string) => {
              setFieldValue('phone', e);
            }}
            onBlur={handleBlur('phone')}
            keyboardType="numeric"
            // errorMessage={errors?.phone && touched?.phone ? errors?.phone : ''}
          />
        </CardWrapper>
      </View>
      <Button
        action={handleSubmit}
        variant="primary"
        btnName="Continue"
        className="mt-auto"
        isLoading={isPending}
      />
    </>
  );
};

export default LoginViaPhone;
