import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import Button from '../../../shared/buttons';
import Heading from '../../../shared/Heading';
import { localstorageKeys } from '../../../utils/localstorageKeys';
import tw from '../../../utils/tailwind';
import useHook from './useHook';

const EnterOtp = ({ navigation, route }: any) => {
  const { setOtp, error, count, isPending, resendOtp } = useHook(
    navigation,
    route,
  );
  const handleSubmit = async () => {
    const registeredDeviceId = await AsyncStorage.getItem(
      localstorageKeys.REGISTERED_DEVICE_ID,
    );
    resendOtp({
      mode: 'phone',
      identifier: route?.params?.phone,
      registeredDeviceId: registeredDeviceId ?? '',
      type: 'customer',
    });
  };
  return (
    <>
      <View style={tw`gap-y-4`}>
        <View style={tw`gap-y-2`}>
          <Heading size="xl">Enter OTP</Heading>
          <Text style={tw`text-secondary`}>
            Enter the OTP sent to your phone&nbsp;
            <Text style={tw`font-medium`}>{route?.params?.phone}</Text>
          </Text>
        </View>
        <OtpInput
          numberOfDigits={6}
          focusColor={tw.color('primary')}
          autoFocus={false}
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={(e: string) => setOtp(e)}
          theme={{
            pinCodeTextStyle: tw`text-black`,
            filledPinCodeContainerStyle: tw`border border-primary`,
          }}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
        />

        {error && (
          <Text style={tw`text-red-500 font-medium mt-[10px]`}>{error}</Text>
        )}
        <View style={tw`flex-row items-center gap-x-1`}>
          <Text style={tw`font-medium text-xs text-secondary`}>
            Did not receive OTP yet?
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (count === 0) {
                handleSubmit();
              }
            }}
          >
            <Text style={tw`font-bold text-xs text-secondary`}>
              Resend again
            </Text>
          </TouchableOpacity>
          {count !== 0 && (
            <Text style={tw`text-xs text-secondary font-medium`}>
              ({'in' + ' ' + count + ' ' + 'sec'})
            </Text>
          )}
        </View>
      </View>
      <Button action={() => {}} btnName="Continue" isLoading={isPending} />
    </>
  );
};

export default EnterOtp;
